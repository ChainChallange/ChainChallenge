
export default function formatResultInspect(data: any) {
  return {
    reports: data.reports,
    metadata: {
      exception_payload: data.exception_payload,
      processed_input_count: data.processed_input_count,
      status: data.status
    }
  };
}