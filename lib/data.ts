export interface TimelineStep {
  id: string
  title: string
  description: string
  details: string
  icon: string
}

export interface QuizQuestion {
  id: string
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
}

export interface RegionData {
  region: string
  introText: string
  timeline: TimelineStep[]
  votingSteps: TimelineStep[]
  quiz: QuizQuestion[]
}

export const electionData: Record<string, RegionData> = {
  India: {
    region: 'India',
    introText: 'The Election Commission of India (ECI) oversees the largest democratic exercise in the world, ensuring free and fair elections for over 900 million voters.',
    timeline: [
      {
        id: 'delimitation',
        title: 'Delimitation of Constituencies',
        description: 'Boundaries of electoral constituencies are drawn to ensure equal representation.',
        details: 'The Delimitation Commission redraws the boundaries of various assembly and Lok Sabha constituencies based on a recent census, ensuring each constituency has roughly the same population.',
        icon: 'map-pin',
      },
      {
        id: 'electoral_roll',
        title: 'Preparation of Electoral Rolls',
        description: 'Voter lists are updated to add new voters and remove deceased or shifted voters.',
        details: 'The ECI continuously updates the electoral rolls. Citizens turning 18 are encouraged to register during special summary revision drives.',
        icon: 'users',
      },
      {
        id: 'announcement',
        title: 'Announcement & Model Code of Conduct',
        description: 'The ECI announces election dates, and the Model Code of Conduct (MCC) comes into effect.',
        details: 'The MCC provides guidelines for political parties to ensure fair play. It restricts the ruling party from announcing new financial grants, projects, or making ad-hoc appointments that might influence voters.',
        icon: 'megaphone',
      },
      {
        id: 'nomination',
        title: 'Filing and Scrutiny of Nominations',
        description: 'Candidates file nomination papers along with an affidavit of assets and criminal records.',
        details: 'The Returning Officer scrutinizes the nominations for validity. Candidates have a window to withdraw their candidacy. After withdrawal, the final list of contesting candidates is published.',
        icon: 'file-text',
      },
      {
        id: 'campaign',
        title: 'Election Campaigning',
        description: 'Parties and candidates reach out to voters through rallies, manifestos, and media.',
        details: 'The ECI monitors campaign expenditure. Campaigning officially ends 48 hours before polling begins, known as the "silence period," to give voters time to think peacefully.',
        icon: 'users',
      },
      {
        id: 'voting',
        title: 'Polling Day',
        description: 'Citizens cast their votes at designated polling booths using EVMs and VVPATs.',
        details: 'Polling is held in multiple phases for national elections. Electronic Voting Machines (EVMs) record the vote, while Voter Verifiable Paper Audit Trail (VVPAT) machines provide a printed slip for verification.',
        icon: 'check-square',
      },
      {
        id: 'results',
        title: 'Counting & Declaration of Results',
        description: 'Votes are counted on a scheduled day under strict security, and results are declared.',
        details: 'The party or coalition securing a majority forms the government. If no party achieves a clear majority, a hung assembly/parliament occurs, leading to coalition negotiations.',
        icon: 'bar-chart-2',
      },
    ],
    votingSteps: [
      {
        id: 'eligibility',
        title: '1. Check Eligibility',
        description: 'You must be an Indian citizen, 18 years or older on the qualifying date.',
        details: 'Ensure you are not disqualified under any law. You can verify your name in the electoral roll online via the Voter Portal.',
        icon: 'user-check',
      },
      {
        id: 'registration',
        title: '2. Voter Registration',
        description: 'Apply for a Voter ID card (EPIC) via Form 6 online or offline.',
        details: 'Use the Voter Helpline App or nvsp.in. Keep your address proof and age proof handy during the application process.',
        icon: 'id-card',
      },
      {
        id: 'polling_booth',
        title: '3. Find Your Polling Booth',
        description: 'Locate your designated polling station before the election day.',
        details: 'You can find your booth details on your voter slip or by searching your EPIC number on the ECI website.',
        icon: 'map-pin',
      },
      {
        id: 'verification',
        title: '4. Identity Verification',
        description: 'At the booth, polling officials will verify your identity and mark your finger.',
        details: 'Show your Voter ID or any other approved ID proof (e.g., Aadhaar, PAN). The first polling officer checks your name, and the second marks your left forefinger with indelible ink.',
        icon: 'user-check',
      },
      {
        id: 'evm',
        title: '5. Using EVM & VVPAT',
        description: 'Press the blue button against your chosen candidate on the EVM.',
        details: 'After pressing the button, look at the VVPAT window. A printed slip with the candidate\'s serial number, name, and symbol will be visible for 7 seconds before dropping into a sealed box, confirming your vote.',
        icon: 'box',
      },
    ],
    quiz: [
      {
        id: 'q1',
        question: 'What is the minimum voting age in India?',
        options: ['16 years', '18 years', '21 years', '25 years'],
        correctAnswer: 1,
        explanation: 'The 61st Constitutional Amendment Act of 1988 reduced the voting age from 21 years to 18 years.'
      },
      {
        id: 'q2',
        question: 'What does VVPAT stand for?',
        options: ['Voting Verification Paper Audit Trail', 'Voter Verifiable Paper Audit Trail', 'Vote Validation Process And Trail', 'Voter Verified Print Audit Trail'],
        correctAnswer: 1,
        explanation: 'VVPAT stands for Voter Verifiable Paper Audit Trail. It allows voters to verify that their vote was cast correctly.'
      },
      {
        id: 'q3',
        question: 'When does the Model Code of Conduct come into effect?',
        options: ['A month before voting', 'Immediately after election dates are announced', 'On the voting day', 'After nominations are filed'],
        correctAnswer: 1,
        explanation: 'The Model Code of Conduct (MCC) comes into force immediately when the Election Commission announces the election schedule.'
      }
    ]
  }
}
