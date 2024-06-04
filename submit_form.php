<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $servername = "localhost";
    $username = "root";
    $password = "Wedidit@20";
    $dbname = "wedidit_db";

    // Create connection
    $conn = new mysqli($servername, $username, $password, $dbname);

    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }else {
        echo "Connected to database successfully.<br>";
    }

    // Check which form is being submitted by checking specific fields
    if (isset($_POST["box"])) {
        // Handle newsletter subscription form
        if (!empty($_POST["box"])) {
            $email = $_POST["box"];

            // Prepare and bind the SQL statement
            $stmt = $conn->prepare("INSERT INTO subscribers (email) VALUES (?)");

            // Check if the statement is prepared successfully
            if (!$stmt) {
                die("Error in preparing statement: " . $conn->error);
            }

            // Bind parameters
            $stmt->bind_param("s", $email);

            // Execute the statement
            if ($stmt->execute()) {
                // Close statement
                $stmt->close();

                // Close connection
                $conn->close();

                // Redirect back to the same page after form submission
                header("Location: index.php?success=true");
                exit();
            } else {
                echo "Error executing SQL statement: " . $stmt->error;
            }
        } else {
            echo "Email is required";
        }
    } elseif (isset($_POST["name"]) && isset($_POST["email"]) && isset($_POST["number"]) && isset($_POST["message"])) {
        // Handle contact form
        if (!empty($_POST["name"]) && !empty($_POST["email"]) && !empty($_POST["number"]) && !empty($_POST["message"])) {
            $name = $_POST["name"];
            $email = $_POST["email"];
            $number = $_POST["number"];
            $message = $_POST["message"];

            // Prepare and bind the SQL statement
            $stmt = $conn->prepare("INSERT INTO contact (name, email, number, message) VALUES (?, ?, ?, ?)");

            // Check if the statement is prepared successfully
            if (!$stmt) {
                die("Error in preparing statement: " . $conn->error);
            }

            // Bind parameters
            $stmt->bind_param("ssss", $name, $email, $number, $message);

            // Execute the statement
            if ($stmt->execute()) {
                // Close statement
                $stmt->close();

                // Close connection
                $conn->close();

                // Redirect back to the same page after form submission
                header("Location: index.php?success=true");
                exit();
            } else {
                echo "Error executing SQL statement: " . $stmt->error;
            }
        } else {
            echo "All fields are required";
        }
    } else {
        echo "Invalid form submission";
    }
} else {
    // If the request method is not POST, redirect to index.php
    header("Location: index.php");
    exit();
}
?>
