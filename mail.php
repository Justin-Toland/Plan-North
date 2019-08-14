<?php

  //For trouble shoooting
  // echo "<pre>";print_r($_POST);echo "</pre>";
  // echo "<pre>";print_r($response);echo "</pre>";

    $name = $_POST['name'];
    $email = $_POST['email'];
    $message = $_POST['message'];
    $formcontent=" From: $name  \n Email: $email \n Message: $message";
    $recipient = "malevolentseed@gmail.com";
    $subject = "PLANNORTH Website Message";
    $mailheader = "From: $email \r\n";
    mail($recipient, $subject, $formcontent, $mailheader) or die("Error!");

?>
