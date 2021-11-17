<?php

$data = [
    'cgpa' => 8,
    'attendance' => 75,
    'backlogs' => 0
];

$template = '
function run($data) {
    %s
}
';

function execute()
{
    global $template, $data;
    $user_input = '
        return (
            $data["cgpa"] > 5 &&
            $data["attendance"] >= 75 &&
            $data["backlogs"] < 3
        ) ? "Passed" : "Back kheyeso";
    ';

    $func = sprintf($template, $user_input);
    eval($func);
    print(run($data));
}

execute();

?>