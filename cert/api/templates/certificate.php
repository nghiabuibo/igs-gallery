<?php

$pageLayout = [
	'certificate' => [
		'bg_path' => __DIR__ . '/../assets/pdf/igs-gallery-certificate.pdf',
		'dimension' => [1754, 1240]
	]
];

use setasign\Fpdi\Tcpdf\Fpdi;

$pdf = new Fpdi('L', 'px', $pageLayout['certificate']['dimension'], true, 'UTF-8', false);

// set document information
$pdf->SetCreator(PDF_CREATOR);
$pdf->SetAuthor('IGS Project Gallery');
$pdf->SetTitle('IGS Project Gallery Certificate');
$pdf->SetSubject('IGS Project Gallery');
$pdf->SetKeywords('IGS Project Gallery, Certificate');

// remove default header/footer
$pdf->setPrintHeader(false);
$pdf->setPrintFooter(false);

// set default monospaced font
$pdf->SetDefaultMonospacedFont(PDF_FONT_MONOSPACED);

// set margins
$pdf->SetMargins(PDF_MARGIN_LEFT, PDF_MARGIN_TOP, PDF_MARGIN_RIGHT);

// set auto page breaks
$pdf->SetAutoPageBreak(TRUE, PDF_MARGIN_BOTTOM);

// set image scale factor
$pdf->setImageScale(PDF_IMAGE_SCALE_RATIO);

// set some language-dependent strings (optional)
if (@file_exists(dirname(__FILE__) . '/lang/eng.php')) {
	require_once(dirname(__FILE__) . '/lang/eng.php');
	$pdf->setLanguageArray($l);
}



// ---------------------------------------------------------

// convert TTF font to TCPDF format and store it on the fonts folder
$mont = TCPDF_FONTS::addTTFfont(__DIR__ . '/../assets/fonts/Montserrat-Regular_0.ttf', 'TrueTypeUnicode', '', 96);
$mont_b = TCPDF_FONTS::addTTFfont(__DIR__ . '/../assets/fonts/Montserrat-Bold.ttf', 'TrueTypeUnicode', '', 96);
$mont_i = TCPDF_FONTS::addTTFfont(__DIR__ . '/../assets/fonts/Montserrat-Italic.ttf', 'TrueTypeUnicode', '', 96);
$felix = TCPDF_FONTS::addTTFfont(__DIR__ . '/../assets/fonts/FELIXTI.TTF', 'TrueTypeUnicode', '', 96);

foreach ($entries as $index => $entry) {
	$name = $entry[1];
	$cert = $entry[3];

	/* Page 1 */
	$width = $pageLayout['certificate']['dimension'][0];
	$height = $pageLayout['certificate']['dimension'][1];
	// set the source file
	$pdf->setSourceFile($pageLayout['certificate']['bg_path']);

	// add a page
	$pdf->AddPage('L', $pageLayout['certificate']['dimension']);

	// import certificate page 1
	$tplId = $pdf->importPage(1);
	// use the imported page and place it at point 0, 0 with a width equal to layout width (fullpage)
	$pdf->useTemplate($tplId, 0, 0, $width);

	$pdf->SetTextColor(32, 97, 173);
	$pdf->SetFont($felix, '', 86, false);
	$pdf->writeHTMLCell($width, 300, 0, 565, $name, 0, 0, false, true, 'C');

	$pdf->SetFont($mont, '', 40, false);
	$cert_text = $cert;
	if ($cert !== 'participating') {
		$cert_text = '<span style="font-family: ' . $mont_b . '">' . $cert . '</span>';
	}
	$html = 'for ' .$cert_text. ' in the';
	$pdf->writeHTMLCell($width, 300, 0, 710, $html, 0, 0, false, true, 'C');
	/* End Page 1 */
}

// ---------------------------------------------------------

//Close and output PDF document
$pdf->Output(vn_to_en($name, true) . '_IGS_Project_Gallery_Certificate.pdf', 'I');

//============================================================+
// END OF FILE
//============================================================+