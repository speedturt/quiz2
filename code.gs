function doPost(e) {
  try {
    var sheet = SpreadsheetApp.openById('1Y3YKm6UwJ0GDNzP7UnMj3iiPU3TdYBD05f3XHbzIHc8').getActiveSheet();
    var data  = JSON.parse(e.postData.contents);

    if (sheet.getLastRow() === 0) {
      sheet.appendRow(['Timestamp (IST)', 'Full Name', 'Email', 'Phone', 'Source']);
      sheet.getRange(1,1,1,5).setFontWeight('bold');
    }

    sheet.appendRow([
      Utilities.formatDate(new Date(), 'Asia/Kolkata', 'dd/MM/yyyy HH:mm:ss'),
      data.name  || '',
      data.email || '',
      data.phone || '',
      data.source || 'ProTraderAI'
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ status: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ status: 'ok', message: 'Endpoint live' }))
    .setMimeType(ContentService.MimeType.JSON);
}
