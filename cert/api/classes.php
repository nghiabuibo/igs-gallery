<?php

class ApiResponse
{
	public $status, $message, $data;

	public function __construct($message, $status = 200)
	{
		http_response_code($status);
		$this->status = $status;
		$this->message = $message;
	}

	public function setData($data)
	{
		$this->data = $data;
	}
}

class GGSheetData
{
	public $headers, $entries;

	public function __construct($ggApiKey, $ggApiUrl, $ggSpreadsheetID, $ggSheetName, $ggSheetRange)
	{
		$ggSheetNameEncoded = urlencode($ggSheetName);
		$params = "/values/$ggSheetNameEncoded!$ggSheetRange?key=";
		$endPointUrl = $ggApiUrl . $ggSpreadsheetID . $params . $ggApiKey;

		$curl = curl_init();
		curl_setopt($curl, CURLOPT_URL, $endPointUrl);
		curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
		$result = curl_exec($curl);
		curl_close($curl);

		$entries = json_decode($result)->values;
		$headers = array_shift($entries);

		$this->headers = $headers;
		$this->entries = $entries;
	}

	private function getHeaderIndex($headerName)
	{
		$headerFiltered = array_filter($this->headers, function ($header) use ($headerName) {
			return $header == $headerName;
		});
		return array_key_first($headerFiltered);
	}

	private function formatValue($value)
	{
		if (!$value) return $value;
		return trim_phone(
			str_replace(
				' ',
				'',
				strtolower(
					vn_to_en($value)
				)
			)
		);
	}

	public function getEntry($index)
	{
		return [
			'headers' => $this->headers,
			'entries' => $this->entries[$index]
		];
	}

	public function getEntries($filters)
	{
		$entriesFiltered = [];

		foreach ($this->entries as $entry) {
			$matched = true;
			foreach ($filters as $headerName => $value) {
				$headerIndex = $this->getHeaderIndex($headerName);
				$formatEntryValue = $this->formatValue($entry[$headerIndex] ?? null);
				$formatFilterValue = $this->formatValue($value);
				if ($formatEntryValue !== $formatFilterValue) {
					$matched = false;
					break;
				}
			}
			if ($matched) {
				$entriesFiltered[] = $entry;
			}
		}

		return [
			'headers' => $this->headers,
			'entries' => $entriesFiltered
		];
	}
}
