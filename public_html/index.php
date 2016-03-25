<!DOCTYPE html>
<html id="html">
    <head>
        <title>Zeh website</title>
        <link rel="stylesheet" type="text/css" href="css/style.css" />
        <script src="js/contentCenter.js" type="text/javascript"></script>
    </head>
    <body>
        <?php
        session_start();

        // set game session key
        if (isset($_POST['game'])) {
            $_SESSION['game'] = str_replace(' ', '-', strtolower($_POST['game']));
        } else {
            $_SESSION['game'] = "snake";
        }
        ?>
        <div class="aside<?php echo ' ' . $_SESSION['game'] . 'Color'; ?>">
            <h1 class="logo">Zeh Website</h1>
            <form id="nav" class="nav" action="" method="post">
                <script src="js/navigation.js" type="text/javascript"></script>
            </form>
        </div>
        <div class="content">
            <?php include_once 'games/' . $_SESSION['game'] . '.php'; ?>
            <script type="text/javascript">
                centerGame();
            </script>
        </div>
    </body>
</html>