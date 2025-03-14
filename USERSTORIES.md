# User Stories - Rumor Tracker

## Story Categories

### Search and Results Display
#### US-1: Multiple Chronological Results
**As a** user searching for a rumor  
**I want to** see multiple results in chronological order  
**So that** I can understand how the rumor has spread across different sources

**Acceptance Criteria:**
- Results are displayed in chronological order
- Each result shows source, date, and excerpt
- Results are grouped by time period
- User can see the progression of the rumor across sources

**Technical Notes:**
- Modify OpenAI API to return multiple results
- Implement result sorting and grouping
- Consider pagination for large result sets

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

## Story Status Tracking

| Story ID | Status | Last Updated | Related PRs |
|----------|--------|--------------|-------------|
| US-1 | Planning | 2024-03-14 | - |
| US-2 | Planning | 2024-03-14 | - |
| US-3 | Planning | 2024-03-14 | - |
| US-4 | In Progress | 2024-03-14 | - | 