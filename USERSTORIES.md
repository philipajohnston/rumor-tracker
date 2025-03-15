# User Stories - Rumor Tracker

## Story Status Tracking

| Story ID | Story Name | Status | Completed | Related PRs |
|----------|------------|--------|-----------|-------------|
| US-1 | Multiple Chronological Results | 🏗️ | - | - |
| US-2 | Horizontal Timeline Display | 📝 | - | - |
| US-3 | Volume-Based Timeline | 📝 | - | - |
| US-4 | Git Structure and Documentation | ✅ | 2024-03-14 | #1 |
| US-5 | Story Completion Tracking | ✅ | 2024-03-14 | #2 |

Status Key:
- ✅ Complete
- 🏗️ In Progress  
- 📝 Planning
- ⏸️ On Hold

## Story Categories

### Search and Results Display
#### US-1: Multiple Chronological Results
**As a** user searching for a rumor  
**I want to** see multiple results in chronological order  
**So that** I can understand how the rumor has spread across different sources

**Acceptance Criteria:**
- API collects up to 15 results
- Display shows exactly 7 results from different domains:
  - 2 earliest results preserved
  - 5 results evenly distributed across remaining timeline
- Results are displayed in chronological order
- Each result shows source, date, and excerpt
- Results are grouped by time period
- User can see the progression of the rumor across sources

**Technical Notes:**
- Modify OpenAI API to return multiple results (max 15)
- Implement result sorting and domain-based filtering
- Create processResults function for distribution logic
- Implement result grouping by time period
- Consider pagination for viewing all 15 results

#### US-2: Horizontal Timeline Display
**As a** user viewing rumor results  
**I want to** see a horizontal timeline with 4-5 key points  
**So that** I can quickly understand the rumor's spread over time

**Acceptance Criteria:**
- Timeline displays horizontally with earliest on left
- Shows 4-5 most significant points
- Each point has detailed information on hover
- Timeline is responsive on different screen sizes

**Technical Notes:**
- Implement using modern timeline library
- Add hover state interactions
- Ensure mobile responsiveness

#### US-3: Volume-Based Timeline Visualization
**As a** user analyzing rumor spread  
**I want to** see timeline thickness varying with result volume  
**So that** I can understand when the rumor was most active

**Acceptance Criteria:**
- Timeline thickness reflects volume of results
- Visual distinction between high and low volume periods
- Consistent scale across different searches
- Smooth transitions between thickness changes

**Technical Notes:**
- Implement volume calculation algorithm
- Use CSS transforms for thickness
- Consider data normalization approaches

### Development Process
#### US-4: Git Structure and Documentation
**As a** developer working on the project  
**I want to** have structured commits and documented user stories  
**So that** we can track feature implementation and user needs effectively

**Acceptance Criteria:**
- User stories are documented and accessible
- Commits reference relevant user stories
- PR template includes story checklist
- Documentation is maintained with code changes

**Technical Notes:**
- Use conventional commits format
- Include story IDs in commits
- Keep USERSTORIES.md updated

#### US-5: Story Completion Tracking
**As a** Project Lead  
**I want to** have user stories automatically marked as complete when all acceptance criteria are met  
**So that** I can easily track project progress

**Acceptance Criteria:**
- [x] Stories are marked complete when all criteria are met
- [x] Completion status is reflected in USERSTORIES.md
- [x] Completion date is recorded
- [x] Related PRs are linked

**Technical Notes:**
- Update status in story tracking table ✅
- Link to completing PR ✅
- Record completion date ✅

**Status:**
- [x] Complete (2024-03-14)
- Related PR: #2 