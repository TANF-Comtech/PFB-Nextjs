/**
 * memberFormatter()
 *
 * Desc: takes full `node` data, makes nodes consistent with algolia shape
 * See readme.md in this folder for generalized information about what's going on below.
 *
 * @param { array } payload - expects salesforce data dump
 */
export function memberFormatter(payload) {
  const formattedPayload = [];
  if (payload.length > 1) {
    payload.map((record) => {
      formattedPayload.push({
        Name: record.Name,
        Website: record.Website,
        objectID: record.Id,
        Letter: record.Name.charAt(0)
      });
    });
  }

  return formattedPayload;
}
