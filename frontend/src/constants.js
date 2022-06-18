

export const adminStatusOptions = [
    { key: 'active', value: 'Active' },
    { key: 'deleted', value: 'Deleted' }
];

export const adminRoleOptions = [
    { key: 'director', value: 'Director' },
    { key: 'manager', value: 'Manager' },
    { key: 'leader', value: 'Leader' },
    { key: 'member', value: 'Member' }
];

export const adminTeamOptions = [
    { key: 'director', value: 'Director' },
    { key: 'marketer', value: 'Marketer' },
    { key: 'engineer', value: 'Engineer' },
    { key: 'hr', value: 'HR' },
    { key: 'sales', value: 'Sales' },
    { key: 'admin', value: 'Admin' }
];

// Task
export const colorCode = {
    grey: '#566573',
    orange: '#ff4f00',
    brown: '#C28416',
    waterblue:'#d4f1f9',
    red: '#FF0E03',
    green: '#008000',
    blue: '#2616C2',
    yellow: '#FFFF00',
    purple:'#800080',
    default: '#ff4f00',
};

export const taskStatusOption = [
    { key: 'assigned', value: 'Assigned' },
    { key: 'onprogress', value: 'Onprogress' },
    { key: 'completed', value: 'Completed' },
    {key: 'delayed', value: 'Delayed'},
    {key: 'deleted' , value: 'Deleted'},
]

export const taskTypeOption = [
    { key: 'student_support', value: 'Student support' },
    { key: 'meeting', value: 'Internal Team Meeting' },
    { key: 'studying', value: 'Studying' },
    { key: 'project', value: 'Project' },
    { key: 'internal_task', value: 'Internal Task'},
    { key:'internal_project', value: 'Internal Project'},
]
export const taskStudentSupportOptions = [
    { key: 'hackerrank', value: 'Hackerrank' },
    { key: 'ec', value: 'EC' },
    { key: 'cohort', value: 'Cohort' },
    { key: 'pair_programming', value: 'Pair Programming' },
    { key: 'doubt', value: 'Doubt' },
    { key: 'quiz', value: 'Quiz' },
    { key: 'group_development', value: 'Group Development' },
    { key: 'self_development', value: 'Self Development' },
    { key: 'brainstorming', value: 'Brainstorming' },
    { key: 'beniten_team', value: 'Beniten Team' },
    { key: 'training', value: 'Training' },
    { key: 'assignment_check', value: 'Assignment Check' },
    { key: 'review', value: 'Review' },
    { key: 'meeting', value: 'Meeting' },
    { key: 'project', value: 'Project' },
    { key: 'job_support', value: 'Job Support' },
    { key: 'internal_task', value: 'Internal Task'},
    { key:'internal_project', value: 'Internal Project'},
];

export const taskSessionFeedbackOption = [
    { key: 'yes', value: 'Yes' },
    { key: 'no', value: 'No' }
]
export const taskStatusColorOptions = [
    { key: 'assigned', value: colorCode.blue },
    { key: 'onprogress', value: colorCode.purple },
    { key: 'completed', value: colorCode.green },
    { key: 'delayed', value: colorCode.red },
];
//Target

export const targetStatusOption = [
    { key: 'started', value: 'Started' },
    { key: 'working', value: 'Working' },
    { key: 'delayed', value: 'Delayed' },
    { key: 'failed', value: 'Failed' },
    { key: 'achieved', value: 'Achieved' },
    { key: 'deleted', value: 'Deleted' },
]

export const targetTypeOption = [
    { key: 'enrollment', value: 'Enrollment Target' },
    { key: 'attendance', value: 'Attendance Target' },
    { key: 'progress', value: 'Progress Target' },
    { key: 'graduation', value: 'Graduation Target' },
    { key: 'self_dev_project', value: 'Self Dev Project Target' },
    { key: 'group_dev_project', value: 'Group Dev Project Target' },
    { key: 'referral', value: 'Referral Program Target' },
    { key: 'offer', value: 'Offer Target' },
]
export const targetStatusColorOptions = [
    { key: 'started', value: colorCode.green },
    { key: 'working', value: colorCode.blue },
    { key: 'delayed', value:colorCode.orange },
    { key: 'failed', value: colorCode.red},
    { key: 'achieved', value: colorCode.green},
]

export const leaveStatusOptions = [
    { key: 'applied', value: 'Applied'},
    { key: 'req_modification', value: 'Request Modification'},
    { key: 'forwarded', value: 'Forwarded'},
    { key: 'approved',value: 'Approved' },
    { key: 'rejected', value: 'Rejected'}
];

export const leaveStatusColorOptions = [
    { key: 'applied', value: colorCode.green },
    { key: 'req_modification', value: colorCode.blue },
    { key: 'forwarded', value: colorCode.orange },
    { key: 'approved',value: colorCode.green },
    { key: 'rejected', value: colorCode.red }
];

export const leaveStatusPermission = {
    'member': [],
    'co-ordinator': [{ key: 'req_modification', value: 'Request Modification'}, 
    { key: 'forwarded', value: 'Forwarded'}],
    'Director': leaveStatusOptions ,
    'Manager': leaveStatusOptions,
    'Leader': leaveStatusOptions,
    

}
