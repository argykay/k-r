/**
 * Google Apps Script for K & R wedding RSVP form
 * Receives form submissions and appends to a Google Sheet
 *
 * Setup:
 * 1. Create a new Google Sheet
 * 2. Add headers in row 1:
 *    Timestamp | Full Name | Email | Attending | Plus One |
 *    Plus One Name | Guest Dietary Preference | Plus One Dietary Preference |
 *    Children | Children Count | Kids Meal | Housewarming | Wedding Bus | Locale
 * 3. Extensions → Apps Script, paste this code, save
 * 4. Deploy → New deployment → Web app
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 5. Copy the web app URL into REACT_APP_RSVP_SCRIPT_URL
 */

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var p = e.parameter;

    var timestamp = new Date();
    var fullName = p.full_name || '';
    var email = p.email || '';
    var attending = p.attending || '';
    var plusOne = p.plus_one || '';
    var plusOneName = p.plus_one_name || '';
    var guestMeal = p.guest_meal || '';
    var plusOneMeal = p.plus_one_meal || '';
    var children = p.children || '';
    var childrenCount = p.children_count || '';
    var kidsMeal = p.kids_meal || '';
    var housewarming = p.housewarming || '';
    var weddingBus = p.wedding_bus || '';
    var locale = p.locale || '';

    sheet.appendRow([
      timestamp,
      fullName,
      email,
      attending,
      plusOne,
      plusOneName,
      guestMeal,
      plusOneMeal,
      children,
      childrenCount,
      kidsMeal,
      housewarming,
      weddingBus,
      locale,
    ]);

    return json({ ok: true });
  } catch (err) {
    return json({ ok: false, error: 'server_error' });
  }
}

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON
  );
}
