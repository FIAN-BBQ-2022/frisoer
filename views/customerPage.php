<?php
/* @var int $barberId */
/* @var int $userId */
/* @var string $role */
/* @var string $firstName */
/* @var string $lastName */

?>
<!doctype html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css"
          integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <title>Termin Buchung</title>


</head>
<style>
    * {
        font-weight: 900;
        font-size: 24px;
    }

    h1 {
        color: white;
    }


  /*   * {
        text-shadow: 1px 1px 2px black;
        font-weight: 900;
        font-size: 18px;
        color: white;
    } */

    tbody {
        text-shadow: 1px 1px 1px black;
        color: white;
    }

    body {
        background-image: url("https://www.friseurinnung-rems-murr.de/fileadmin/_processed_/d/e/csm_AdobeStock_297675193_sk_768c3bab31.jpg");
    }

    input:hover, button:hover {
        background-color: lightblue;
        border-style: solid;
    }
</style>

<body onload="loadDoc(loadCurrentMonday())">
<div style="height: 100px">
    <div class="col-12">
<!--         col-12 col-sm-6 col-md-8-->
        <div>
            <h1 class="text-center display-4 mt-1">Terminkalender</h1>
        </div>

        <div class="text-right">
            <button class="logout btn btn-dark btn-sm mb-3" >Logout</button>
        </div>

        <table class="table table-hover table-sm text-center">
            <thead class="thead-dark">
            <tr>
                <th class="text-center dropdown" id="barberSelector" scope="col"></th>
                <th class="text-center align-middle" scope="col">Dienstag</th>
                <th class="text-center align-middle" scope="col">Mittwoch</th>
                <th class="text-center align-middle" scope="col">Donnerstag</th>
                <th class="text-center align-middle" scope="col">Freitag</th>
                <th class="text-center align-middle" scope="col">Samstag</th>
            </tr>
            </thead>

            <tbody id="tableData">
            </tbody>

        </table>


        <input type="hidden" id="inputUserId" name="userId" value="<?php echo $userId ?>">
        <input type="hidden" id="inputUserRole" name="userRole" value="<?php echo $role ?>">
        <input type="hidden" id="inputUserName" name="userName" value="<?php echo $firstName . ' ' . $lastName; ?>">
        <div class="text-center">
            <button type="button" class="btn btn-warning btn-sm " onclick="loadLastMonday(mondayDateTime)"><--</button>
            &nbsp
            <button type="button" class="btn btn-warning btn-sm " onclick="newAppointment()">speichern</button>
            &nbsp
            <button type="button" class="btn btn-warning btn-sm " onclick="loadNextMonday(mondayDateTime)">--></button>
        </div>


    </div>
</div>

<script src="/assets/js/main.js"></script>
<script src="/assets/js/logout.js"></script>
</body>

</html>