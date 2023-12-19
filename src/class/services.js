async function postData(range, data) {
    try {
      let response = await gapi.client.sheets.spreadsheets.values.append({
        spreadsheetId: spreadsheetId,
        range: range,
        includeValuesInResponse: true,
        insertDataOption: "INSERT_ROWS",
        responseDateTimeRenderOption: "FORMATTED_STRING",
        responseValueRenderOption: "FORMATTED_VALUE",
        valueInputOption: "USER_ENTERED",
        resource: {
          majorDimension: "ROWS",
          range: "",
          values: [
            data
          ]
        }
      })
      return response
    } catch (e) {
  
    }
  }