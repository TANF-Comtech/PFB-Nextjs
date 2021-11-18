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
        Name: record.Published_Name__c ? record.Published_Name__c : null,
        Website: record.Website ? record.Website : null,
        objectID: record.Id ? record.Id : null,
        Letter: record.Published_Name__c ? record.Published_Name__c.charAt(0) : null
      });
    });
  }

  return formattedPayload;
}
