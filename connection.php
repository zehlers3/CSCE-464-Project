<?php
$servername = "localhost";
$username = "root"; 
$password = "root"; 
$dbname = "customer"; 

$conn = new mysqli($servername, $username, $password, $dbname);


if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$email = $_POST['email'];
$firstname = $_POST['firstname'];
$lastname = $_POST['lastname'];
$phone = $_POST['phone'];
$address = $_POST['address'];

$sql = "SELECT email FROM Customers WHERE email = '$email'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    echo "Email already registered.";
} else {
    $sql = "INSERT INTO Customers (email, first_name, last_name, phone, address) VALUES ('$email', '$firstname', '$lastname', '$phone', '$address')";
    if ($conn->query($sql) === TRUE) {
        echo "New record created successfully";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
}

$conn->close();
?>
