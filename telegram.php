<?php

/* https://api.telegram.org/bot5259017370:AAFVWfpyNu3IjNqjW7SAmdgdaz7QXZAIF7w/getUpdates,
где, XXXXXXXXXXXXXXXXXXXXXXX - токен вашего бота, полученный ранее */
$token = "5259017370:AAFVWfpyNu3IjNqjW7SAmdgdaz7QXZAIF7w";
$chat_id = "-722809328";

$fields = ['client-name', 'client-phone', 'client-email', 'client-feedback'];
$required = ['client-phone'];
$filed_names = [
    'client-name' => 'Имя пользователя',
    'client-phone' => 'Телефон',
    'client-email' => 'Email',
    'client-feedback' => 'Отзыв'
];

$_POST = json_decode(file_get_contents('php://input'), true);

$errors = [];

foreach ($required as $field) {
    if (!$_POST[$field]) {
        $errors[$field] = 'Поле обязательно';
    }
}

if (count($errors)) {
    header('Content-Type: application/json; charset=utf-8');
    http_response_code(422);
    echo json_encode([ 'message' => 'Invalid input', 'errors' => $errors ]);
    die();
}

$txt = '';

foreach ($fields as $field) {
    if ($_POST[$field]) {
        $value = urlencode($_POST[$field]);
        $txt .= "<b>{$filed_names[$field]}</b> {$value}%0A";
    }
}

$sendToTelegram = fopen("https://api.telegram.org/bot{$token}/sendMessage?chat_id={$chat_id}&parse_mode=html&text={$txt}", "r");

if ($sendToTelegram) {
    echo "Success";
} else {
    header('Content-Type: application/json; charset=utf-8');
    http_response_code(500);
    echo json_encode([ 'message' => 'Unknown error' ]);
}
?>