<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';

$mail = new PHPMailer(true);

try {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $message = $_POST['message'];
    $file = $_FILES['file'] ?? null;

    $mail->isSMTP();
    $mail->Host = 'mail.enternine.com';  // Replace with your SMTP server
    $mail->SMTPAuth = true;
    $mail->Username = 'madhu@enternine.com';  // 🔹 your Gmail
    $mail->Password = 'Madhu@8704';   // 🔹 app password (not Gmail password)
    $mail->SMTPSecure = 'tls';
    $mail->Port = 587;

    $mail->setFrom($email, $name);
    $mail->addAddress('madhu@enternine.com');  // 🔹 recipient email

    $mail->isHTML(true);
    $mail->Subject = "New Contact Form Submission";
    $mail->Body = "
        <h3>Contact Form Details</h3>
        <p><b>Name:</b> {$name}</p>
        <p><b>Email:</b> {$email}</p>
        <p><b>Message:</b> {$message}</p>
    ";

    if ($file && $file['tmp_name']) {
        $mail->addAttachment($file['tmp_name'], $file['name']);
    }

    $mail->send();
    echo json_encode(['success' => true]);
} catch (Exception $e) {
    echo json_encode(['success' => false, 'error' => $mail->ErrorInfo]);
}
?>
