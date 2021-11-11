<?php

function execute()
{
    $data = array(
        'cgpa' => 8
    );

    $str = '$x = $data["cgpa"]; return $x > 5;';
    $res = eval($str);
    print($res);
}

execute();

?>