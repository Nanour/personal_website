<?php

session_start();
$action = $_GET['action'];
if ($action == "sendemail"){
  sendemail();
}

function sendemail(){
  $name = $_GET["sendtoname"];
  $email = $_GET["sendtoemail"];
  $temp = $_GET["sendtomessage"];
  $message = "Name:".$name." Email:".$email." Message:".$temp;
  $to = "ruonanz131@gmail.com";
  $subject = "Personal Website";
  $headers = "Personal Website";
  mail($to, $subject, $message, $headers);
}
?>
