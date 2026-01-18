from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

ROLE_REQUIREMENTS = {
    "Senior Full Stack Developer": [
        "React", "Node.js", "System Design", "AWS", "Docker", "TypeScript", "CI/CD", "GraphQL"
    ],
    "Data Scientist": [
        "Python", "SQL", "Machine Learning", "Pandas", "TensorFlow", "Statistics", "Data Viz"
    ],
    "DevOps Engineer": [
        "Linux", "Docker", "Kubernetes", "AWS", "Terraform", "Jenkins", "Python"
    ]
}


class CandidateProfile(BaseModel):
    current_role: str
    current_skills: List[str]
    experience_years: int


class GapAnalysisRequest(BaseModel):
    candidate: CandidateProfile
    target_role: str


class RoadmapAction(BaseModel):
    title: str
    type: str  # 'course', 'project', 'reading'
    desc: str


class RoadmapPhase(BaseModel):
    phase: int
    duration: str
    focus: str
    topics: List[str]
    actions: List[RoadmapAction]  # New field for detailed steps


class GapAnalysisResponse(BaseModel):
    match_score: int
    missing_skills: List[str]
    matching_skills: List[str]
    readiness_level: str
    estimated_time: str
    roadmap: List[RoadmapPhase]
    market_demand: str  # New field


@app.post("/analyze-gap", response_model=GapAnalysisResponse)
async def analyze_career_gap(data: GapAnalysisRequest):
    target = data.target_role
    required_skills = ROLE_REQUIREMENTS.get(target, ROLE_REQUIREMENTS["Senior Full Stack Developer"])

    user_skills_norm = [s.lower() for s in data.candidate.current_skills]
    matching = [s for s in required_skills if s.lower() in user_skills_norm]
    missing = [s for s in required_skills if s.lower() not in user_skills_norm]

    match_count = len(matching)
    total_count = len(required_skills)
    score = int((match_count / total_count) * 100) if total_count > 0 else 0

    readiness = "Low"
    if score > 75:
        readiness = "High"
    elif score > 40:
        readiness = "Medium"

    # Dynamic Roadmap Generation
    roadmap = []
    if missing:
        # Phase 1: Core Gaps
        phase1_skills = missing[:len(missing) // 2]
        if phase1_skills:
            roadmap.append(RoadmapPhase(
                phase=1,
                duration="4-6 Weeks",
                focus="Foundation & Core Gaps",
                topics=phase1_skills,
                actions=[
                    RoadmapAction(title="Build a PoC Project", type="project",
                                  desc=f"Create a mini-app using {phase1_skills[0]} to cement basics."),
                    RoadmapAction(title="Official Documentation", type="reading",
                                  desc=f"Read deep-dive guides on {phase1_skills[0]} and {phase1_skills[1] if len(phase1_skills) > 1 else ''}.")
                ]
            ))

        # Phase 2: Advanced
        phase2_skills = missing[len(missing) // 2:]
        if phase2_skills:
            roadmap.append(RoadmapPhase(
                phase=2,
                duration="6-8 Weeks",
                focus="Advanced Integration",
                topics=phase2_skills,
                actions=[
                    RoadmapAction(title="System Design Integration", type="project",
                                  desc="Combine your new skills into a scalable microservice architecture."),
                    RoadmapAction(title="Performance Tuning", type="course",
                                  desc="Learn how to optimize and deploy these technologies in production.")
                ]
            ))

        # Phase 3: Mastery
        roadmap.append(RoadmapPhase(
            phase=3,
            duration="4 Weeks",
            focus="Production Readiness",
            topics=["System Design", "Security"],
            actions=[
                RoadmapAction(title="Capstone Project", type="project",
                              desc="Deploy a full-stack clone of a popular app (e.g., Trello, Slack)."),
                RoadmapAction(title="Mock Interviews", type="reading", desc="Practice explaining your architecture decisions.")
            ]
        ))

    return {
        "match_score": score,
        "missing_skills": missing,
        "matching_skills": matching,
        "readiness_level": readiness,
        "estimated_time": f"{len(missing) * 4} Weeks",
        "roadmap": roadmap,
        "market_demand": "High"
    }