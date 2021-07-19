<?php
// output headers so that the file is downloaded rather than displayed
header('Content-Type: text/csv; charset=utf-8');
header('Content-Disposition: attachment; filename=data.csv');

// setup the connection
//$connection = mysqli_connect('localhost:8889','root','root','test_db');

// create a file pointer connected to the output stream
$output = fopen('php://output', 'w');
//$output = fopen('res_tmp.csv','w');

// output the column headings
//fputcsv($output, array('sub_experiment_name', 'field_name', 'result', 'user_id'));
fputcsv($output, array('creation_time','user_id','workerId','age','gender','musical_experience',
  'field_id','task_id','exp_id','result'));

$select = 'SELECT
results.creation_time AS creation_time,
users.id AS user_id,
users.worker_id AS worker_id,
users.age AS age,
users.gender AS gender,
users.musical_experience AS musical_experience,
results.field_id AS field_id,
results.task_id AS task_id,
results.exp_id AS exp_id,
results.result AS result
FROM results
LEFT JOIN users
ON results.user_id = users.id
ORDER BY creation_time';

// $select = 'SELECT 
// sub_experiments.name AS sub_experiment_name,
// fields.name AS field_name,
// results.result AS result,
// users.id AS user_id
// FROM experiments
// LEFT JOIN sub_experiments
// ON experiments.id = sub_experiments.experiment_id
// LEFT JOIN fields
// ON sub_experiments.id = fields.sub_experiment_id
// LEFT JOIN results
// ON fields.id = results.field_id 
// JOIN users
// ON results.user_id = users.id
// WHERE experiments.id=1';

if($result = mysqli_query($connection,$select)) 
{
 
  // loop over the rows, outputting them
  //while ($row = mysqli_fetch_assoc($result)) fputcsv($output, $row);
  while ($row = mysqli_fetch_assoc($result)) {
    // convert results into unt8
    $row['result'] = base64_decode($row['result']);
    fputcsv($output, $row);
    //var_dump($row);
  }

} 
else 
{
  echo "SELECT failed:" . mysqli_connect_error();
}
exit;

?>