<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\SMTP;

require '../js/mailer/Exception.php';
require '../js/mailer/PHPMailer.php';
require '../js/mailer/SMTP.php';

$phone = $_POST['phone'];

try {
	$mail = new PHPMailer();
	$mail->isSMTP();
	$mail->CharSet = "UTF-8";
	$mail->SMTPAuth = true;

	$mail->Host = 'Your host';
	$mail->Username = 'Your username';
	$mail->Password = 'Your pass';
    $mail->SMTPOptions = array(
     'ssl' => array(
         'verify_peer' => false,
         'verify_peer_name' => false,
         'allow_self_signed' => true
     )
);
	$mail->Port = 587;
	$mail->setFrom('address1', 'Полипласт');

	$mail->addAddress('address2');

	$mail->isHTML(true);
	$mail->Subject = 'Заявка';
	$mail->Body = 'Phone - ' . $phone;
	$mail->send();
} catch (Exception $e) {
    echo $mail->ErrorInfo;
}
