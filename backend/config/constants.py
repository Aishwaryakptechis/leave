
DATE_FORMAT = '%Y-%m-%d'
DATE_TIME_FORMAT = '%Y-%m-%d %H:%M:%S'

USER_STATUS = (
    ('active', 'Active'),
    ('deleted', 'Deleted')
)

USER_ROLE = (
    ('director', 'Director'),
    ('manager', 'Manager'),
    ('leader', 'Leader'),
    ('member', 'Member'),
    ('co-ordinator','Co-Ordinator')
)

USER_TEAM = (
    ('director', 'Director'),
    ('marketer', 'Marketer'),
    ('engineer', 'Engineer'),
    ('hr', 'HR'),
    ('sales', 'Sales'),
    ('admin', 'Admin'),
    ('communication','Communication')
)

TARGET_STATUS = (
    ('started', 'Started'),
    ('working', 'Working'),
    ('delayed', 'Delayed'),
    ('failed', 'Failed'),
    ('achieved', 'Achieved'),
    ('deleted', 'Deleted')
)

TARGET_TYPE = (
    ('enrollment', 'Enrollment Target'),
    ('attendance', 'Attendance Target'),
    ('progress', 'Progress Target'),
    ('graduation', 'Graduation Target'),
    ('self_dev_project', 'Self Dev Project Target'),
    ('group_dev_project', 'Group Dev Project Target'),
    ('referral', 'Referral Program Target'),
    ('offer', 'Offer Target'),
)

TASK_STATUS = (
    ('assigned', 'assigned'),
    ('onprogress', 'onprogress'),
    ('completed', 'completed'),
    ('delayed', 'Delayed'),
    ('deleted' , 'Deleted'),
)

TASK_TYPE = (
    ('student_support', 'Student Support'),
    ('meeting', 'Internal Team Meeting'),
    ('studying', 'Studying'),
    ('project', 'Project(Client Project, Internal Project)'),
    ('internal_task', 'Internal task'),
    ('internal_project', 'Internal Project'),
)

TASK_SUPPORT_TYPE = (
    ('hackerrank', 'Hackerrank'),
    ('ec', 'EC'),
    ('cohort', 'Cohort'),
    ('pair_programming', 'Pair Programming'),
    ('doubt', 'Doubt'),
    ('quiz', 'Quiz'),
    ('group_development', 'Group Development'),
    ('self_development', 'Self Development'),
    ('brainstroming', 'Brainstroming'),
    ('beniten_team', 'Beniten Team'),
    ('training', 'Training'),
    ('assignment_check', 'Assignment Check'),
    ('review', 'Team Review'),
    ('meeting', 'Meeting'),
    ('project', 'Project Support'),
    ('job_support', 'Job Support'),
    ('internal_task', 'Internal Task'),
    ('internal_project', 'Internal Project'),
    
)

TASK_FEEDBACK = (
    ('yes', 'Yes'),
    ('no', 'No'),
)
COMMUNICATION_TYPE = (
    ('critical', 'Critical'),
    ('general', 'General'),
    ('error', 'Error')
    
)

LEAVE_STATUS = (
    ('applied', 'Applied'),
    ('req_modification', 'Request Modification'),
    ('forwarded', 'Forwarded'),
    ('approved', 'Approved'),
    ('rejected','Rejected')
)
