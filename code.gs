function getAuthType() {
  return { type: "NONE" };
}

function getConfig() {
  return {
    configParams: [],
    dateRangeRequired: true
  };
}

const FIELD_MAP = {
  Active_Listening___Engagement: {
    name: "Active_Listening___Engagement",
    label: "Active Listening - Engagement",
    dataType: "NUMBER"
  },
  Call_Flow___Structure: {
    name: "Call_Flow___Structure",
    label: "Call Flow - Structure",
    dataType: "NUMBER"
  },
  Closing___Next_Steps: {
    name: "Closing___Next_Steps",
    label: "Closing - Next Steps",
    dataType: "NUMBER"
  },
  Consultative_Approach: {
    name: "Consultative_Approach",
    label: "Consultative Approach",
    dataType: "NUMBER"
  },
  Discovery___Need_Identification: {
    name: "Discovery___Need_Identification",
    label: "Discovery - Need Identification",
    dataType: "NUMBER"
  },
  Mis_Selling: {
    name: "Mis_Selling",
    label: "Mis Selling",
    dataType: "BOOLEAN"
  },
  Next_Steps___Hindi: {
    name: "Next_Steps___Hindi",
    label: "Next Steps - Hindi",
    dataType: "NUMBER"
  },
  Objection_Handling: {
    name: "Objection_Handling",
    label: "Objection Handling",
    dataType: "NUMBER"
  },
  Sales_Campaign: {
    name: "Sales_Campaign",
    label: "Sales Campaign",
    dataType: "BOOLEAN"
  },
  Solution_Positioning___Differentiation: {
    name: "Solution_Positioning___Differentiation",
    label: "Solution Positioning - Differentiation",
    dataType: "NUMBER"
  },
  Value_Proposition_Alignment: {
    name: "Value_Proposition_Alignment",
    label: "Value Proposition Alignment",
    dataType: "NUMBER"
  },
  callInstanceId: {
    name: "callInstanceId",
    label: "Call ID",
    dataType: "STRING"
  },
  company: {
    name: "company",
    label: "Company",
    dataType: "STRING"
  },
  created_at: {
    name: "created_at",
    label: "Created At",
    dataType: "STRING"
  },
  deal_flag: {
    name: "deal_flag",
    label: "Deal Flag",
    dataType: "BOOLEAN"
  },
  deal_id: {
    name: "deal_id",
    label: "Deal ID",
    dataType: "STRING"
  },
  hierarchy_role: {
    name: "hierarchy_role",
    label: "Hierarchy Role",
    dataType: "STRING"
  },
  hostEmailId: {
    name: "hostEmailId",
    label: "Host Email",
    dataType: "STRING"
  },
  meetingEndTime: {
    name: "meetingEndTime",
    label: "Meeting End Time",
    dataType: "STRING"
  },
  meetingStartTime: {
    name: "meetingStartTime",
    label: "Meeting Start Time",
    dataType: "STRING"
  },
  meeting_source: {
    name: "meeting_source",
    label: "Meeting Source",
    dataType: "STRING"
  },
  pitch_score: {
    name: "pitch_score",
    label: "Pitch Score",
    dataType: "NUMBER"
  },
  role_type: {
    name: "role_type",
    label: "Role Type",
    dataType: "STRING"
  },
  success: {
    name: "success",
    label: "Success",
    dataType: "BOOLEAN"
  },
  title: {
    name: "title",
    label: "Meeting Title",
    dataType: "STRING"
  },
  totalMeetingTime: {
    name: "totalMeetingTime",
    label: "Meeting Time (min)",
    dataType: "NUMBER"
  },
  user_email: {
    name: "user_email",
    label: "User Email",
    dataType: "STRING"
  },
  user_name: {
    name: "user_name",
    label: "User Name",
    dataType: "STRING"
  },
  user_name_from_users: {
    name: "user_name_from_users",
    label: "User Name (from Users)",
    dataType: "STRING"
  }
};

function getSchema() {
  return {
    schema: Object.values(FIELD_MAP)
  };
}

function getData(request) {
  const from = request.dateRange?.startDate || "2025-06-01";
  const to = request.dateRange?.endDate || "2025-06-30";
  const url = `https://fetchmongodbdata-752215674158.asia-south1.run.app?company=Good_Meetings&from=${from}&to=${to}`;

  const response = UrlFetchApp.fetch(url);
  const json = JSON.parse(response.getContentText());

  const requestedFields = request.fields.map(f => f.name);
  const schema = requestedFields.map(name => FIELD_MAP[name]);

  const rows = json.map(record => ({
    values: requestedFields.map(name => record.hasOwnProperty(name) ? record[name] : null)
  }));

  return {
    schema,
    rows
  };
}
