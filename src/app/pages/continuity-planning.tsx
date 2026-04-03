import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { CheckCircle, Circle, Clock, User, AlertCircle, Lightbulb, Target } from "lucide-react";
import { Progress } from "../components/ui/progress";

const recommendedInterventions = [
  {
    id: 1,
    title: "Activate Backup Data Center",
    description: "Switch to redundant systems to ensure business continuity",
    priority: "high",
    impact: "Critical infrastructure protection",
    status: "pending",
    estimatedTime: "2 hours",
  },
  {
    id: 2,
    title: "Reroute Supply Chain",
    description: "Alternative logistics path through Region B",
    priority: "high",
    impact: "Maintain operational delivery",
    status: "in-progress",
    estimatedTime: "6 hours",
  },
  {
    id: 3,
    title: "Deploy Emergency Communication Protocol",
    description: "Activate secure channels for crisis management",
    priority: "moderate",
    impact: "Team coordination and safety",
    status: "completed",
    estimatedTime: "1 hour",
  },
  {
    id: 4,
    title: "Secure Physical Assets",
    description: "Implement protection measures for critical facilities",
    priority: "moderate",
    impact: "Asset preservation",
    status: "in-progress",
    estimatedTime: "4 hours",
  },
];

const recoveryWorkflow = [
  {
    phase: "Assessment",
    steps: [
      { name: "Evaluate incident severity", status: "completed", assignee: "Risk Team" },
      { name: "Identify affected systems", status: "completed", assignee: "IT Department" },
      { name: "Determine resource requirements", status: "completed", assignee: "Operations" },
    ],
  },
  {
    phase: "Response",
    steps: [
      { name: "Activate emergency protocols", status: "completed", assignee: "Crisis Manager" },
      { name: "Deploy backup systems", status: "in-progress", assignee: "Infrastructure Team" },
      { name: "Notify stakeholders", status: "in-progress", assignee: "Communications" },
    ],
  },
  {
    phase: "Recovery",
    steps: [
      { name: "Restore primary systems", status: "pending", assignee: "Engineering Team" },
      { name: "Verify data integrity", status: "pending", assignee: "QA Team" },
      { name: "Resume normal operations", status: "pending", assignee: "Operations" },
    ],
  },
  {
    phase: "Review",
    steps: [
      { name: "Document incident response", status: "pending", assignee: "Documentation Team" },
      { name: "Conduct post-mortem analysis", status: "pending", assignee: "Management" },
      { name: "Update continuity plans", status: "pending", assignee: "Planning Team" },
    ],
  },
];

const taskAssignments = [
  {
    role: "Continuity Manager",
    name: "Sarah Johnson",
    tasksAssigned: 8,
    tasksCompleted: 5,
    currentTask: "Coordinate backup activation",
  },
  {
    role: "Resilience Officer",
    name: "Michael Chen",
    tasksAssigned: 6,
    tasksCompleted: 4,
    currentTask: "Monitor recovery procedures",
  },
  {
    role: "Analyst",
    name: "Emily Rodriguez",
    tasksAssigned: 10,
    tasksCompleted: 7,
    currentTask: "Update risk assessments",
  },
  {
    role: "Admin",
    name: "James Wilson",
    tasksAssigned: 5,
    tasksCompleted: 3,
    currentTask: "Review access permissions",
  },
];

export function ContinuityPlanning() {
  const totalSteps = recoveryWorkflow.reduce((acc, phase) => acc + phase.steps.length, 0);
  const completedSteps = recoveryWorkflow.reduce(
    (acc, phase) => acc + phase.steps.filter((step) => step.status === "completed").length,
    0
  );
  const progressPercentage = Math.round((completedSteps / totalSteps) * 100);

  return (
    <div className="space-y-6 overflow-x-hidden">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl sm:text-3xl">Continuity Planning</h1>
        <Badge variant="outline" className="text-cyan-400 border-cyan-400">
          Recovery in Progress
        </Badge>
      </div>

      {/* Overall Recovery Progress */}
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-gray-100 flex items-center gap-2">
            <Target className="w-5 h-5 text-cyan-400" />
            Overall Recovery Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-6">
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-300">Recovery Completion</span>
                <span className="text-2xl text-cyan-400">{progressPercentage}%</span>
              </div>
              <Progress value={progressPercentage} className="h-4 bg-gray-800">
                <div
                  className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all"
                  style={{ width: `${progressPercentage}%` }}
                />
              </Progress>
              <div className="flex items-center justify-between mt-2 text-sm text-gray-400">
                <span>
                  {completedSteps} of {totalSteps} steps completed
                </span>
                <span>
                  {recoveryWorkflow.reduce((acc, phase) => acc + phase.steps.filter((s) => s.status === "in-progress").length, 0)}{" "}
                  in progress
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recommended Interventions */}
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-gray-100 flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-cyan-400" />
            Recommended Interventions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recommendedInterventions.map((intervention) => (
              <div
                key={intervention.id}
                className={`bg-gray-800 rounded-lg p-4 border transition-colors ${
                  intervention.priority === "high" ? "border-red-500/30" : "border-gray-700"
                }`}
              >
                <div className="mb-3 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="text-gray-100">{intervention.title}</h4>
                      <Badge
                        variant="outline"
                        className={
                          intervention.priority === "high"
                            ? "text-red-400 border-red-400"
                            : "text-yellow-400 border-yellow-400"
                        }
                      >
                        {intervention.priority}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-400 mb-2">{intervention.description}</p>
                    <div className="flex flex-col gap-2 text-xs text-gray-500 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
                      <span className="flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        Impact: {intervention.impact}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {intervention.estimatedTime}
                      </span>
                    </div>
                  </div>
                  <Badge
                    className={
                      intervention.status === "completed"
                        ? "bg-green-500/20 text-green-400"
                        : intervention.status === "in-progress"
                        ? "bg-yellow-500/20 text-yellow-400"
                        : "bg-gray-700 text-gray-300"
                    }
                  >
                    {intervention.status === "completed" ? (
                      <CheckCircle className="w-3 h-3 mr-1" />
                    ) : intervention.status === "in-progress" ? (
                      <Clock className="w-3 h-3 mr-1" />
                    ) : (
                      <Circle className="w-3 h-3 mr-1" />
                    )}
                    {intervention.status.replace("-", " ")}
                  </Badge>
                </div>
                {intervention.status === "pending" && (
                  <div className="flex flex-col gap-2 sm:flex-row">
                    <Button size="sm" className="bg-cyan-500 hover:bg-cyan-600 text-white">
                      Initiate
                    </Button>
                    <Button size="sm" variant="outline" className="border-gray-600 text-gray-300">
                      More Details
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recovery Workflow Tracker */}
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-gray-100">Recovery Workflow Tracker</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {recoveryWorkflow.map((phase, phaseIndex) => (
              <div key={phaseIndex}>
                <div className="flex items-center gap-2 mb-3">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      phase.steps.every((s) => s.status === "completed")
                        ? "bg-green-500/20 text-green-400"
                        : phase.steps.some((s) => s.status === "in-progress")
                        ? "bg-cyan-500/20 text-cyan-400"
                        : "bg-gray-700 text-gray-400"
                    }`}
                  >
                    {phaseIndex + 1}
                  </div>
                  <h4 className="text-gray-100">{phase.phase}</h4>
                  <Badge variant="outline" className="text-gray-400 border-gray-600">
                    {phase.steps.filter((s) => s.status === "completed").length}/{phase.steps.length}
                  </Badge>
                </div>
                <div className="ml-4 pl-4 border-l-2 border-gray-700 space-y-3">
                  {phase.steps.map((step, stepIndex) => (
                    <div key={stepIndex} className="flex flex-col gap-2 py-2 sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex items-center gap-3">
                        {step.status === "completed" ? (
                          <CheckCircle className="w-5 h-5 text-green-400" />
                        ) : step.status === "in-progress" ? (
                          <Clock className="w-5 h-5 text-cyan-400" />
                        ) : (
                          <Circle className="w-5 h-5 text-gray-600" />
                        )}
                        <span
                          className={
                            step.status === "completed"
                              ? "text-gray-400 line-through"
                              : step.status === "in-progress"
                              ? "text-cyan-400"
                              : "text-gray-300"
                          }
                        >
                          {step.name}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 pl-8 sm:pl-0">
                        <User className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-500">{step.assignee}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Role-based Task Assignments */}
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-gray-100 flex items-center gap-2">
            <User className="w-5 h-5 text-cyan-400" />
            Role-based Task Assignments
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {taskAssignments.map((assignment, index) => (
              <div key={index} className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <Badge variant="outline" className="text-cyan-400 border-cyan-400 mb-2">
                      {assignment.role}
                    </Badge>
                    <h4 className="text-gray-100">{assignment.name}</h4>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl text-cyan-400">{assignment.tasksCompleted}</div>
                    <div className="text-xs text-gray-500">of {assignment.tasksAssigned}</div>
                  </div>
                </div>
                <Progress
                  value={(assignment.tasksCompleted / assignment.tasksAssigned) * 100}
                  className="mb-3 bg-gray-700"
                >
                  <div
                    className="h-full bg-cyan-500 transition-all"
                    style={{ width: `${(assignment.tasksCompleted / assignment.tasksAssigned) * 100}%` }}
                  />
                </Progress>
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-400">Current: {assignment.currentTask}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
