<?php
  use PHPMailer\PHPMailer\PHPMailer;
  use PHPMailer\PHPMailer\Exception;

  require '../PHPMailer/src/Exception.php';
  require '../PHPMailer/src/PHPMailer.php';
  require '../PHPMailer/src/SMTP.php';
  require 'email_credentials.php';

  define('DEBUG', false);

  if (!DEBUG) error_reporting(0);
  setlocale(LC_ALL, 'pl_PL', 'pl', 'Polish_Poland.28592');

  if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Data validation
    $validationOK = true;
    $tmpLen = 0;

    $name = strip_tags(trim($_POST['contact-form-name']));
    $nameLen = strlen($name);
    if ($nameLen < 2 || $nameLen > 50 || !preg_match('/[a-zA-Z0-9]+/', $name)) {
      $validationOK = false;
    }      
    
    $mailUser = trim($_POST['contact-form-email']);
    $mailSafe = filter_var($mailUser, FILTER_SANITIZE_EMAIL);
    if ( !filter_var($mailSafe, FILTER_VALIDATE_EMAIL) || $mailSafe != $mailUser ) {
      $validationOK = false;
    }
    
    $telUser = strip_tags(trim($_POST['contact-form-tel']));
    $telLen = 0;
    $telSafe = '';
    $telLen = strlen($telUser);
    if ($telLen > 0) {
      $telSafe = filter_var($telUser, FILTER_SANITIZE_NUMBER_INT);
      if ( $telSafe != $telUser || $telLen > 15 || $telLen < 7) {
        $validationOK = false;
      }
    }
    
    $msg = trim($_POST['contact-form-msg']);
    if (strlen($msg) < 2) {
      $validationOK = false;
    }

    // if user's input isn't valid
    // set 400 response code (bad request) and exit 
    if (!$validationOK) {
      http_response_code(400);
      echo "Podano niepoprawne dane.";
      exit;
    }   
    
    // Set email data
    $mail = new PHPMailer(true);

    try {
      $mail->CharSet = 'UTF-8';

      //Server settings
      $mail->isSMTP();                      
      if(DEBUG) $mail->SMTPDebug = 2;       
      $mail->Host       = EMAIL_HOST;       
      $mail->SMTPAuth   = true;             
      $mail->Username   = EMAIL_USERNAME;   
      $mail->Password   = EMAIL_PASSWORD;   
      $mail->SMTPSecure = EMAIL_SECURE_TYPE;
      $mail->Port       = EMAIL_PORT;       
  
      //Sender
      $mail->setFrom(EMAIL_USERNAME);
      $mail->addReplyTo($mailSafe, $name);
      
      //Recipient
      $mail->addAddress(EMAIL_USERNAME);    
  
      // Content
      $mailContent =  "Nazwa: <strong>$name</strong><br>";
      $mailContent .= "E-mail: <strong>$mailSafe</strong><br>";
      $mailContent .= "Telefon: <strong>$telSafe</strong><br>";
      $mailContent .= "Wiadomość: <br>$msg";

      $mail->isHTML(true);                                  
      $mail->Subject = 'Portfolio - Wiadomość z formularza kontaktowego';
      $mail->Body    = $mailContent;
      $mail->AltBody = $mailContent;
  
      $mail->send();

      // set a 200 (okey) response code
      http_response_code(200);
    }
    catch (Exception $e) {
      // set a 500 (internal server error) response code
      http_response_code(500);

      if(DEBUG) {
        echo html_entity_decode(error_get_last()['message']);
        echo "Mailer Error: {$mail->ErrorInfo}";
      }
    }

    // $recipient = "zajac.bartlomiej97@gmail.com";
    // $subject = "Wiadomość z formularza kontaktowego";
    // // $subject = '=?UTF-8?B?' . base64_encode($subject) . '?=';
    // $mailContent =  "Nazwa: <strong>$name</strong><br>";
    // $mailContent .= "E-mail: <strong>$mailSafe</strong><br>";
    // $mailContent .= "Telefon: <strong>$telSafe</strong><br>";
    // $mailContent .= "Wiadomość: <br>$msg";
    // // $headers = "From: $name <$mailSafe> \r\n";
    // // $headers .= "Content-Type: text/html; charset=utf-8 \r\n";

    // // Send mail
    // if ( mail($recipient, $subject, $mailContent, $headers) ) {
    //   // set a 200 (okey) response code
    //   http_response_code(200);
    // }
    // else {
    //   // set a 500 (internal server error) response code
    //   http_response_code(500);
    //   if(DEBUG) echo html_entity_decode(error_get_last()['message']);
    // }
  }


  // Not POST request, set forbidden response (403)
  else {
    http_response_code(403);
    if(DEBUG) echo html_entity_decode(error_get_last()['message']);
  }
?>