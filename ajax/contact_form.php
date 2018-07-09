<?php
  setlocale(LC_ALL, 'pl_PL', 'pl', 'Polish_Poland.28592');

  if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Data validation
    $validationOK = true;
    $tmpLen = 0;

    $name = strip_tags(trim($_POST['contact-form-name']));
    $tmpLen = strlen($name);
    if ($tmpLen < 2 || $tmpLen > 50 || !preg_match('/[a-zA-Z0-9]+/', $name)) {
      $validationOK = false;
    }      
    
    $mailUser = trim($_POST['contact-form-email']);
    $mailSafe = filter_var($mailUser, FILTER_SANITIZE_EMAIL);
    if ( !filter_var($mailSafe, FILTER_VALIDATE_EMAIL) || $mailSafe != $mailUser ) {
      $validationOK = false;
    }
    
    $tmpLen = strlen($telSafe);
    if ($tmpLen > 0) {
      $telUser = trim($_POST['contact-form-tel']);
      $telSafe = filter_var($telUser, FILTER_SANITIZE_NUMBER_INT);
      if ( !filter_var($telSafe, FILTER_SANITIZE_NUMBER_INT) || $telSafe != $telUser || $tmpLen > 15) {
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
    $recipient = "zajac.bartlomiej97@gmail.com";
    $subject = "Wiadomość z formularza kontaktowego";
    $mailContent =  "Nazwa: $name \n";
    $mailContent .= "E-mail: $mailSafe \n";
    $mailContent .= "Telefon: $telSafe \n";
    $mailContent .= "Wiadomość: \n$msg";
    $headers = 'Content-Type: text/html; charset=utf-8';

    // Send mail
    if ( mail($recipient, $subject, $mailContent, $headers) ) {
      // set a 200 (okey) response code
      http_response_code(200);
      echo "Twoja wiadomość została wysłana";
    }
    else {
      // set a 500 (internal server error) response code
      http_response_code(500);
      echo "Twoja wiadomość nie została wysłana, spróbuj ponownie";
      // echo "mail() error";
    }
  }


  // Not POST request, set forbidden response (403)
  else {
    http_response_code(403);
    // echo "Twoja wiadomość nie została wysłana spróbuj ponownie";
    echo "Problem serwera";
  }
?>