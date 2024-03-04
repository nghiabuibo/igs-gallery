function showSearchLoading() {
	$('button[type="submit"]').prop('disabled', true);
	$('button[type="submit"] .text').addClass('d-none');
	$('button[type="submit"] .icon').removeClass('d-none');
	$('#search_result').addClass('d-none');
	$('#table_loading').removeClass('d-none');
}

function showSearchResult(resultTable) {
	$('#search_result thead').html(resultTable.headerHTML);
	$('#search_result tbody').html(resultTable.bodyHTML);
	$('button[type="submit"]').prop('disabled', false);
	$('button[type="submit"] .text').removeClass('d-none');
	$('button[type="submit"] .icon').addClass('d-none');
	$('#search_result').removeClass('d-none');
	$('#table_loading').addClass('d-none');
}

function getFormData($form) {
	var unindexed_array = $form.serializeArray();
	var indexed_array = {};

	$.map(unindexed_array, function (n, i) {
		indexed_array[n['name']] = n['value'];
	});

	return indexed_array;
}

const errorRow = (message) => {
	return `
		<tr>
			<td class="text-center">
				${message}
			</td>
		</tr>
	`
}

$('#search_form').on('submit', function (e) {
	e.preventDefault();
	showSearchLoading();

	const resultTable = {
		headerHTML: '',
		bodyHTML: ''
	}

	$.ajax({
		type: 'POST',
		url: $(this).attr('action'),
		contentType: 'application/json; charset=utf-8',
		data: JSON.stringify(getFormData($(this))),
		success: function (result) {
			if (result.data?.status < 200 && result.data?.status > 300) {
				resultTable.bodyHTML = errorRow(result.data.message)
				return
			}

			const headers = result.data?.headers
			const [entry] = result.data?.entries

			if (!headers || !entry) {
				resultTable.bodyHTML = errorRow(result.data.message)
				return
			}

			const skipColumns = [0, 3]

			resultTable.headerHTML = '<tr>';
			for (i = 0; i < headers.length; i++) {
				if (skipColumns.includes(i)) continue

				resultTable.headerHTML += '<th scope="col">';
				resultTable.headerHTML += headers[i];
				resultTable.headerHTML += '</th>';
			}
			resultTable.headerHTML += '<th scope="col">Tải Chứng Nhận</th>'
			resultTable.headerHTML += '</tr>';

			resultTable.bodyHTML = '<tr>';
			for (i = 0; i < entry.length; i++) {
				if (skipColumns.includes(i)) continue
				resultTable.bodyHTML += '<td>';
				resultTable.bodyHTML += entry[i];
				resultTable.bodyHTML += '</td>';
			}
			resultTable.bodyHTML += `<td><a target="_blank" class="btn btn-success btn-sm" href="api/?action=download&jwt=${result.data?.jwt}"><i class="bi bi-download"></i></a></td>`
			resultTable.bodyHTML += '</tr>';
		},
		error: function (err) {
			resultTable.bodyHTML = errorRow(err.responseJSON?.message)
		},
		complete: function () {
			showSearchResult(resultTable)
		}
	});
});