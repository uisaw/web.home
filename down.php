<?
$fn = (isset($_GET["fn"]) && $_GET["fn"]!="")? $_GET["fn"] : "";
function filedown($path) {
	if(!$path) Return;
	$rfn = substr($path,strrpos($path,"/")+1,strlen($path));
	$rfn = iconv("UTF-8","EUC-KR",$rfn);
	if(preg_match("/(msie)/i", $_SERVER["HTTP_USER_AGENT"]) && preg_match("/(5\.5)/", $_SERVER["HTTP_USER_AGENT"])) {
		header("content-type: doesn/matter");
		header("content-length: ".filesize("$path"));
		header("content-disposition: attachment; filename=$rfn");
		header("content-transfer-encoding: binary");
	}else {
		header("content-type: file/unknown");
		header("content-length: ".filesize("$path"));
		header("content-disposition: attachment; filename=$rfn");
		header("content-description: php generated data");
	}
	header("pragma: no-cache");
	header("expires: 0");	
	$fp = fopen("$path", "rb");
	if(!fpassthru($fp)) fclose($fp);
}

if($fn!=""){
	filedown($fn);
}else{
?>
<!DOCTYPE html>
<html lang="ko">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<meta http-equiv="Content-Script-Type" content="text/javascript" />
	<meta http-equiv="Content-Style-Type" content="text/css" />
	<meta http-equiv="X-UA-Compatible" content="IE=edge" />
	<meta name="autocomplete" content="off" />
	<meta name="keywords" content="UI" /> 
	<meta name="description" content="UI" />
	<meta name="author" content="barchi" />
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>UI</title>
	<link rel="stylesheet" href="/style.css" type="text/css" />
	<script type="text/javascript">
	//<![CDATA[
		$(function(){
			alert('잘못된 접근입니다.');
			history.back();
		});
	//]]>
	</script>
</head>
<body>
&nbsp;	
</body>
</html>
<?
}
?>