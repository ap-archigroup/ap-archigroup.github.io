<? 
// ----------------------------конфигурация-------------------------- // 
 
$adminemail="arch.vsevolod@gmail.com";  // e-mail админа 
 
 
$date=date("d.m.y"); // число.месяц.год 
 
$time=date("H:i"); // часы:минуты:секунды 
 
$backurl="http://ap-archigroup.com";  // На какую страничку переходит после отправки письма 
 $backurl2="http://ap-archigroup.com#contact"; 
//---------------------------------------------------------------------- // 
 
  
 
// Принимаем данные с формы 
 
$name=$_POST['name']; 
 
$email=$_POST['email']; 
 
$msg=$_POST['message']; 
 
  
 
// Проверяем валидность e-mail 
 
if (!preg_match("|^([a-z0-9_\.\-]{1,20})@([a-z0-9\.\-]{1,20})\.([a-z]{2,4})|is", 
strtolower($email))) 
 
 {
echo "<script type=\"text/javascript\">";
echo "window.alert (\"Wrong mail.Please try again.\")";
echo "</script>";
echo "<<script language='Javascript'><!-- 
function reload() {location = \"$backurl2\"}; setTimeout('reload()', 6); 
//--></script> 
 
$msg 
 
<p>Message Eror.Please whait</p>";  


}
 
 else 
 
 { 
 
 
$msg=" 
 
 
<p>Name: $name</p> 
 
 
<p>E-mail: $email</p> 
 
 
<p>Message: $msg</p> 
 
 
"; 
 
  
 
 // Отправляем письмо админу  
 
mail("$adminemail", "$date $time Message From $name", "$msg"); 
 
  
 
// Сохраняем в базу данных 
 
$f = fopen("message.txt", "a+"); 
 
fwrite($f," \n $date $time Сообщение от $name"); 
 
fwrite($f,"\n $msg "); 
 
fwrite($f,"\n ---------------"); 
 
fclose($f); 
 
  
 
// Выводим сообщение пользователю 
 
echo "<script type=\"text/javascript\">";
echo "window.alert (\"Mail Send.We will call you\")";
echo "</script>";
echo "<<script language='Javascript'><!-- 
function reload() {location = \"$backurl\"}; setTimeout('reload()', 6); 
//--></script> 
 
$msg 
 
<p>Mail Send.Please whait</p>";   
exit; 
 
 } 
 
?>