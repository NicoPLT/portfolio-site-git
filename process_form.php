<?php
// Dati del form
$nome = $_POST['name'];
$email = $_POST['email'];
$oggetto = $_POST['subject'];
$messaggio = $_POST['message'];

// Email a cui inviare il messaggio
$destinatario = "poletto.nico@gmail.com";

// Creazione dell'header della email
$header = "From: " . $nome . " <" . $email . ">\r\n";
$header .= "Reply-To: " . $email . "\r\n";
$header .= "MIME-Version: 1.0\r\n";
$header .= "Content-Type: text/html; charset=UTF-8\r\n";

// Contenuto della email
$contenuto = "Hai ricevuto un messaggio dal form di contatto del tuo sito web:<br><br>";
$contenuto .= "<strong>Nome:</strong> " . $nome . "<br>";
$contenuto .= "<strong>Email:</strong> " . $email . "<br>";
$contenuto .= "<strong>Oggetto:</strong> " . $oggetto . "<br>";
$contenuto .= "<strong>Messaggio:</strong> " . nl2br($messaggio) . "<br>";

// Invio della email
if(mail($destinatario, $oggetto, $contenuto, $header)){
    // Messaggio inviato con successo
    echo "Grazie per averci contattato. Ti risponderemo il prima possibile.";
}else{
    // Errore nell'invio del messaggio
    echo "Si è verificato un errore durante l'invio del messaggio. Per favore riprova più tardi.";
}
header('Location: index.html');
header('Location: index-2.html');
?>
