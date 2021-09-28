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
    payload.map((item) => {
      // Build object
      formattedPayload.push({
        Name: payload.Name,
        Website: payload.Website,
        objectID: payload.Id,
      });
    });
  }

  return formattedPayload;
}
