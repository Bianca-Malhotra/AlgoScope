import React, { useState, useEffect, useRef } from 'react';
import { useInterviewProgress } from './ProgressTracker';
import { QUESTION_DATASET } from './QuestionDataset';
import { 
  Play, Pause, RotateCcw, AlertCircle, Sparkles, Clock,
  Send, Award, HelpCircle, CheckSquare, RefreshCw, ChevronRight, CheckCircle2 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Questions for non-DSA topics in Mixed Round
const MIXED_CONCEPTUAL_QUESTIONS = {
  OOP: [
    {
      question: "What is Polymorphism? Explain the difference between Compile-time and Run-time polymorphism with examples.",
      answer: "Polymorphism is the ability of an object to take on many forms. \n1) Compile-time (Method Overloading): Multiple methods with same name but different signatures in the same class. Resolved at compile time. \n2) Run-time (Method Overriding): A subclass provides a specific implementation of a method declared in its superclass. Resolved at runtime using dynamic binding.",
      rubric: ["Explains Method Overloading vs Overriding", "Mentions dynamic binding/virtual table", "Provides code signature explanation"]
    },
    {
      question: "Explain the SOLID design principles.",
      answer: "SOLID is an acronym for five design principles: \n1) Single Responsibility: A class should have one reason to change. \n2) Open/Closed: Software entities open for extension, closed for modification. \n3) Liskov Substitution: Subtypes must be substitutable for base types. \n4) Interface Segregation: Client-specific interfaces are better than general-purpose ones. \n5) Dependency Inversion: Depend on abstractions, not concretions.",
      rubric: ["Names all five principles correctly", "Explains Open/Closed with extensions", "Explains Liskov Substitution violation example"]
    },
    {
      question: "Explain the difference between Abstraction and Encapsulation with real-world examples.",
      answer: "1) Abstraction: Hiding implementation details and showing only key functionality. Focuses on 'what' an object does. Example: A car driver knows pressing the pedal accelerates, without understanding the internal engine mechanics.\n2) Encapsulation: Wrapping variables (data) and methods (code) together as a single unit, restricting direct access. Focuses on 'how' data is protected. Example: Using private fields with public getters/setters in a class.",
      rubric: ["Explains Abstraction (what it does) vs Encapsulation (how it protects)", "Provides logical real-world examples", "Mentions private access modifiers or class boundaries"]
    },
    {
      question: "What is an Abstract Class and how is it different from an Interface?",
      answer: "1) Abstract Class: A class that cannot be instantiated, can contain both abstract (no body) and concrete methods. Supports single inheritance. Used for closely related classes.\n2) Interface: A template containing only abstract method signatures (prior to Java 8/default methods) and static variables. Supports multiple inheritance. Used to define a contract for what classes can do, regardless of their family line.",
      rubric: ["Compares class vs interface structures", "Mentions single vs multiple inheritance rules", "Explains when to choose one over the other"]
    }
  ],
  DBMS: [
    {
      question: "Explain ACID properties in Database Transaction Management.",
      answer: "ACID stands for: \n1) Atomicity: All operations in a transaction succeed or all roll back. \n2) Consistency: Transaction moves database from one valid state to another. \n3) Isolation: Concurrent transactions do not interfere (levels: Read Uncommitted, Read Committed, Repeatable Read, Serializable). \n4) Durability: Committed changes survive system failures.",
      rubric: ["Identifies all four elements", "Explains Isolation levels or locking", "Mentions Write-Ahead Logging for Durability"]
    },
    {
      question: "What is Database Normalization? Compare 1NF, 2NF, and 3NF.",
      answer: "Normalization organizes tables to reduce redundancy and dependency. \n1) 1NF: Atomic values, no repeating groups. \n2) 2NF: In 1NF and no partial dependencies (non-key attributes depend on whole primary key). \n3) 3NF: In 2NF and no transitive dependencies (non-key attributes depend only on primary key).",
      rubric: ["Defines redundancy reduction", "Explains Partial Dependency (2NF)", "Explains Transitive Dependency (3NF)"]
    },
    {
      question: "What is a database index? Explain how B-Trees make select queries faster.",
      answer: "An index is a database structure that speeds up retrieval of rows. B-Trees organize key values in a balanced hierarchical structure. Instead of performing a full table scan O(N) to locate a record, the database traverses the B-Tree from root to leaf, resolving matches in logarithmic time O(log N). This reduces disk I/O operations significantly.",
      rubric: ["Defines what an index is", "Explains B-Tree structure (root, nodes, leaves)", "Compares O(N) scan vs O(log N) tree path lookup"]
    },
    {
      question: "Explain SQL Joins (Inner, Left, Right, Full) and their performance implications.",
      answer: "1) Inner Join: Returns rows with matching keys in both tables.\n2) Left Join: Returns all rows from left table, and matches from right table (nulls on mismatch).\n3) Right Join: Opposite of Left Join.\n4) Full Join: Returns all rows when there is a match in either table.\nPerformance: Joins depend on index columns. Unindexed joins lead to nested loop scans which degrade database performance. Hash joins or Merge joins are optimized algorithms used by DBMS execution engines.",
      rubric: ["Explains Inner vs Left vs Right Joins", "Mentions how null values are handled", "Mentions index necessity for join operations"]
    }
  ],
  OS: [
    {
      question: "What is a Deadlock? What are the four necessary Coffman conditions for a deadlock?",
      answer: "A deadlock is a state where a set of threads are blocked because each holds a resource and waits for another resource held by another. Coffman Conditions: \n1) Mutual Exclusion: Resource can only be held by one process at a time. \n2) Hold and Wait: Process holds resource while waiting for another. \n3) No Preemption: Resources cannot be forcibly taken. \n4) Circular Wait: Process circular chain exists where each waits for the next.",
      rubric: ["Defines deadlock state", "Identifies all 4 Coffman conditions", "Mentions deadlock prevention/avoidance (Banker's algorithm)"]
    },
    {
      question: "Explain the difference between a Process and a Thread.",
      answer: "1) Process: Independent executing program with its own memory space (code, data, heap). Context switching is expensive. \n2) Thread: Light-weight unit of execution within a process, sharing code, data, and resources, but having its own stack and program counter. Context switching is cheap.",
      rubric: ["Mentions memory sharing", "Compares context switching overhead", "Mentions thread stack independence"]
    },
    {
      question: "Explain Virtual Memory, Paging, and how Page Faults are resolved.",
      answer: "1) Virtual Memory: Separation of user logical memory from physical memory, allowing execution of processes larger than physical RAM.\n2) Paging: Dividing logical memory into fixed-size blocks (Pages) and physical memory into (Frames).\n3) Page Fault: Occurs when a process tries to access a page not loaded in RAM. Resolution: The OS traps the fault, reads page from disk swap space, loads it into a physical frame, updates the page table, and restarts the instruction.",
      rubric: ["Defines Virtual Memory and Paging", "Explains what causes a Page Fault", "Describes OS steps to swap page from disk to RAM"]
    },
    {
      question: "What is the difference between Preemptive and Non-Preemptive scheduling? Give examples.",
      answer: "1) Preemptive Scheduling: The OS can interrupt a running process and assign the CPU to another (e.g. Round Robin, SRTF). Better responsiveness for interactive tasks.\n2) Non-Preemptive Scheduling: A process holds the CPU until it voluntarily terminates or blocks for I/O (e.g. FCFS, SJF). Simpler to implement but can cause starvation/long wait times.",
      rubric: ["Defines preemptive vs non-preemptive CPU allocation", "Provides correct algorithm examples for both", "Mentions starvation or context switching overheads"]
    }
  ],
  Networking: [
    {
      question: "Explain the difference between TCP and UDP. When would you use each?",
      answer: "1) TCP (Transmission Control Protocol): Connection-oriented, reliable, guarantees packet ordering, checks errors, handles congestion. Used for HTTP, FTP, Email. \n2) UDP (User Datagram Protocol): Connectionless, unreliable, no ordering guarantees, low latency. Used for video streaming, gaming, VoIP.",
      rubric: ["Compares reliability and latency", "Mentions connection handshakes (SYN, SYN-ACK, ACK)", "Lists valid use-cases for both"]
    },
    {
      question: "What happens when you type 'google.com' in the browser and press Enter?",
      answer: "Steps: \n1) DNS Lookup: Browser checks cache, hosts file, asks DNS resolver to find IP. \n2) TCP Handshake: Establishes connection with Google server. \n3) TLS/SSL Handshake: Secure encryption setup. \n4) HTTP Request: Browser sends GET request. \n5) Server Processing & Response: Server parses request and returns HTML. \n6) Browser Rendering: Parses HTML, fetches CSS/JS, and renders page.",
      rubric: ["Mentions DNS lookup", "Explains TCP/TLS handshake", "Describes browser parsing and rendering pipeline"]
    },
    {
      question: "Explain the OSI 7-Layer Model and the functions of the Transport and Application layers.",
      answer: "OSI Model: Physical, Data Link, Network, Transport, Session, Presentation, Application.\n1) Transport Layer (Layer 4): Handles end-to-end communication, reliability, flow control, and port addressing (TCP/UDP).\n2) Application Layer (Layer 7): Provides network services directly to applications/users (HTTP, FTP, DNS, SMTP).",
      rubric: ["Lists the OSI layers correctly", "Explains end-to-end ports at Transport Layer", "Explains direct protocols at Application Layer"]
    },
    {
      question: "What is the difference between symmetric and asymmetric encryption? Give examples.",
      answer: "1) Symmetric Encryption: Uses the same secret key for both encryption and decryption. Fast and efficient. Example: AES, DES.\n2) Asymmetric Encryption: Uses a key pair: a public key for encryption and a private key for decryption. More secure but computationally expensive. Example: RSA, ECC, Diffie-Hellman.",
      rubric: ["Compares key counts (same key vs key pair)", "Compares speed and complexity", "Gives valid cryptographic examples (AES, RSA)"]
    }
  ]
};

// MCQ Quiz Question Pool (covers OS, DBMS, Networks, OOP, DSA)
const MCQ_QUESTION_POOL = [
  {
    category: 'OS',
    question: 'Which scheduling algorithm is non-preemptive in nature?',
    options: ['Round Robin', 'First-Come, First-Served (FCFS)', 'Shortest Remaining Time First (SRTF)', 'Preemptive Priority'],
    correctIndex: 1,
    explanation: 'FCFS is completely non-preemptive. Once a process gets the CPU, it runs until it terminates or blocks for I/O.'
  },
  {
    category: 'DBMS',
    question: 'Which SQL constraint guarantees that all values in a column are distinct?',
    options: ['FOREIGN KEY', 'NOT NULL', 'UNIQUE', 'DEFAULT'],
    correctIndex: 2,
    explanation: 'The UNIQUE constraint ensures that all values in a column or set of columns are unique (distinct) from one another.'
  },
  {
    category: 'Networks',
    question: 'Which layer of the OSI model handles routing, routing tables, and IP addressing?',
    options: ['Data Link Layer', 'Network Layer', 'Transport Layer', 'Physical Layer'],
    correctIndex: 1,
    explanation: 'The Network Layer (Layer 3) is responsible for routing packets across networks, managing IP addresses, and path selection.'
  },
  {
    category: 'OOP',
    question: 'What is the term used to describe creating a new class from an existing class to inherit properties and methods?',
    options: ['Encapsulation', 'Polymorphism', 'Inheritance', 'Abstraction'],
    correctIndex: 2,
    explanation: 'Inheritance allows a child class to inherit the structure, attributes, and methods of a parent class.'
  },
  {
    category: 'DSA',
    question: 'What is the worst-case time complexity of searching in a balanced Binary Search Tree (BST)?',
    options: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'],
    correctIndex: 1,
    explanation: 'In a balanced BST (like AVL or Red-Black Tree), the height is guaranteed to be log(n), making both average and worst-case searches O(log n).'
  },
  {
    category: 'OS',
    question: 'What is "Thrashing" in Operating Systems?',
    options: ['A crash of database connections', 'High CPU utilization due to infinite loops', 'Excessive page swapping resulting in very little actual execution', 'Automated deletion of temp files'],
    correctIndex: 2,
    explanation: 'Thrashing occurs when the system spends more time swapping virtual memory pages in and out of disk than executing processes.'
  },
  {
    category: 'DBMS',
    question: 'In database systems, which property ensures that once a transaction commits, its changes survive crashes?',
    options: ['Atomicity', 'Consistency', 'Isolation', 'Durability'],
    correctIndex: 3,
    explanation: 'Durability guarantees that the results of a committed transaction persist in non-volatile memory even in the event of a system failure.'
  },
  {
    category: 'Networks',
    question: 'Which HTTP status code represents "Unauthorized Access"?',
    options: ['400 Bad Request', '401 Unauthorized', '403 Forbidden', '404 Not Found'],
    correctIndex: 1,
    explanation: 'HTTP 401 represents "Unauthorized", usually requiring authentication details. (403 represents "Forbidden", meaning authenticated but permission denied).'
  },
  {
    category: 'OOP',
    question: 'Which design principle states that classes should be open for extension but closed for modification?',
    options: ['Single Responsibility Principle', 'Open/Closed Principle', 'Liskov Substitution Principle', 'Dependency Inversion Principle'],
    correctIndex: 1,
    explanation: 'This is the Open/Closed Principle (the "O" in SOLID), which encourages adding new features by adding classes/modules rather than modifying existing ones.'
  },
  {
    category: 'DSA',
    question: 'Which sorting algorithm has a guaranteed worst-case time complexity of O(n log n) and is stable?',
    options: ['Quicksort', 'Heapsort', 'Bubble Sort', 'Merge Sort'],
    correctIndex: 3,
    explanation: 'Merge Sort guarantees O(n log n) worst-case time complexity and is a stable sort. Quicksort is O(n^2) worst-case and unstable. Heapsort is O(n log n) but unstable.'
  },
  {
    category: 'Networks',
    question: 'Which protocol operates at the Application Layer of the TCP/IP stack?',
    options: ['IP (Internet Protocol)', 'TCP (Transmission Control Protocol)', 'HTTP (Hypertext Transfer Protocol)', 'UDP (User Datagram Protocol)'],
    correctIndex: 2,
    explanation: 'HTTP works at Layer 7 (Application Layer) to serve webpage text/assets. IP is Network Layer, TCP/UDP are Transport Layer.'
  },
  {
    category: 'OS',
    question: 'What is a "Critical Section" in operating systems concurrency?',
    options: ['A memory partition allocated for system boot scripts', 'A segment of code accessing shared variables that must not be concurrently accessed by multiple threads', 'A high priority queue containing CPU processes', 'A sector of hard disk storing page tables'],
    correctIndex: 1,
    explanation: 'A critical section is a part of code that accesses shared resources (like memory, variables) and must execute atomically to avoid race conditions.'
  },
  {
    category: 'DBMS',
    question: 'Which database normalization form is specifically designed to eliminate Transitive Dependencies?',
    options: ['First Normal Form (1NF)', 'Second Normal Form (2NF)', 'Third Normal Form (3NF)', 'Boyce-Codd Normal Form (BCNF)'],
    correctIndex: 2,
    explanation: 'A table is in 3NF if it is in 2NF and has no transitive dependencies (where a non-key column depends on another non-key column).'
  },
  {
    category: 'OOP',
    question: 'What is the core object-oriented concept that combines data variables and operations into a single class entity?',
    options: ['Encapsulation', 'Polymorphism', 'Inheritance', 'Abstraction'],
    correctIndex: 0,
    explanation: 'Encapsulation is the process of bundling data (variables) and behavior (methods) inside a class while shielding internal states.'
  },
  {
    category: 'DSA',
    question: 'What is the average time complexity of looking up a key inside a properly-distributed Hash Map?',
    options: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'],
    correctIndex: 0,
    explanation: 'With a good hash function distributing keys uniformly, lookup completes in constant O(1) average time.'
  },
  {
    category: 'OS',
    question: 'Which of the following is NOT a Page Replacement algorithm used in Virtual Memory management?',
    options: ['Least Recently Used (LRU)', 'First-In, First-Out (FIFO)', 'Optimal Page Replacement', 'Dijkstra\'s Shortest Path Algorithm'],
    correctIndex: 3,
    explanation: 'Dijkstra\'s is a graph search algorithm for finding shortest paths, not a virtual memory page swap algorithm.'
  },
  {
    category: 'DBMS',
    question: 'What is the primary purpose of a FOREIGN KEY constraint in relational databases?',
    options: ['Ensures every column is populated', 'Establishes referential integrity relationships between columns in different tables', 'Guarantees columns have distinct records', 'Automatically indexes values in ascending order'],
    correctIndex: 1,
    explanation: 'FOREIGN KEY referential constraints lock values to match secondary records in secondary tables, preventing invalid links.'
  },
  {
    category: 'Networks',
    question: 'What is the primary function of the Domain Name System (DNS)?',
    options: ['Encapsulates packets into frames', 'Translates human-readable domain names to numerical IP addresses', 'Encrypts browser connection requests', 'Routes data between routers'],
    correctIndex: 1,
    explanation: 'DNS acts as a phonebook for the internet, translating domain names (like google.com) to target IP addresses (like 142.250.190.46).'
  }
];


export default function MockInterviewPanel() {
  const { addMockRecord } = useInterviewProgress();

  // Mode Selection: null, 'DSA', 'HR', 'Mixed', 'MCQ'
  const [activeMode, setActiveMode] = useState(null);

  // General Interview State
  const [currentStep, setCurrentStep] = useState(0); // For mixed round (0 to 5) or MCQ step (0 to 9)
  const [activeQuestion, setActiveQuestion] = useState(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [showExplanation, setShowExplanation] = useState(false);
  const [revealedHintsCount, setRevealedHintsCount] = useState(0);

  // MCQ Specific State
  const [mcqQuestions, setMcqQuestions] = useState([]);
  const [selectedMcqOption, setSelectedMcqOption] = useState(null); // index of option selected
  const [mcqScoreCount, setMcqScoreCount] = useState(0);

  // Self Evaluation Rubric state
  const [rubricScores, setRubricScores] = useState({
    timeSpaceCorrect: false,
    handledEdgeCases: false,
    communicationClear: false,
    optimumApproachSolved: false
  });

  // AI Feedback generation state
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [aiFeedback, setAiFeedback] = useState(null);

  // Completed Session summary state
  const [sessionScore, setSessionScore] = useState(null);

  // Timer States
  const [timeLeft, setTimeLeft] = useState(2700); // 45 minutes default for DSA
  const [timerRunning, setTimerRunning] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    if (timerRunning) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            setTimerRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [timerRunning]);

  // Setup DSA Mock Round
  const startDsaRound = () => {
    const dsaQs = QUESTION_DATASET.filter(q => q.category !== 'HR Questions' && q.category !== 'Behavioral Questions');
    const randomQ = dsaQs[Math.floor(Math.random() * dsaQs.length)];
    setActiveQuestion(randomQ);
    setUserAnswer('');
    setShowExplanation(false);
    setRevealedHintsCount(0);
    setTimeLeft(2700); // 45 mins
    setTimerRunning(true);
    setRubricScores({
      timeSpaceCorrect: false,
      handledEdgeCases: false,
      communicationClear: false,
      optimumApproachSolved: false
    });
    setAiFeedback(null);
    setSessionScore(null);
    setActiveMode('DSA');
  };

  // Setup HR Mock Round
  const startHrRound = () => {
    const hrQs = QUESTION_DATASET.filter(q => q.category === 'HR Questions' || q.category === 'Behavioral Questions');
    const randomQ = hrQs[Math.floor(Math.random() * hrQs.length)];
    setActiveQuestion(randomQ);
    setUserAnswer('');
    setShowExplanation(false);
    setAiFeedback(null);
    setSessionScore(null);
    setActiveMode('HR');
  };

  // Setup MCQ Mock Round
  const startMcqRound = () => {
    // Shuffle and pick 10 MCQs
    const shuffled = [...MCQ_QUESTION_POOL].sort(() => 0.5 - Math.random());
    const selection = shuffled.slice(0, 10);
    setMcqQuestions(selection);
    setCurrentStep(0);
    setActiveQuestion(selection[0]);
    setSelectedMcqOption(null);
    setMcqScoreCount(0);
    setSessionScore(null);
    setShowExplanation(false);
    setActiveMode('MCQ');
  };

  // Setup Mixed Round Questions array
  const [mixedQuestionsList, setMixedQuestionsList] = useState([]);

  const startMixedRound = () => {
    // Collect 6 questions:
    // 1. DSA
    // 2. OOP
    // 3. DBMS
    // 4. OS
    // 5. Networking
    // 6. HR
    const dsaQs = QUESTION_DATASET.filter(q => q.category !== 'HR Questions' && q.category !== 'Behavioral/HR');
    const dsa = dsaQs[Math.floor(Math.random() * dsaQs.length)];

    const pickConcept = (topic) => {
      const arr = MIXED_CONCEPTUAL_QUESTIONS[topic];
      return arr[Math.floor(Math.random() * arr.length)];
    };

    const oop = pickConcept('OOP');
    const dbms = pickConcept('DBMS');
    const os = pickConcept('OS');
    const net = pickConcept('Networking');

    const hrQs = QUESTION_DATASET.filter(q => q.category === 'HR Questions' || q.category === 'Behavioral Questions');
    const hr = hrQs[Math.floor(Math.random() * hrQs.length)];

    const list = [
      { type: 'DSA', ...dsa },
      { type: 'OOP', ...oop, title: 'OOP Concept' },
      { type: 'DBMS', ...dbms, title: 'DBMS Concept' },
      { type: 'OS', ...os, title: 'Operating Systems Concept' },
      { type: 'Networking', ...net, title: 'Computer Networks' },
      { type: 'HR', ...hr }
    ];

    setMixedQuestionsList(list);
    setCurrentStep(0);
    setActiveQuestion(list[0]);
    setUserAnswer('');
    setShowExplanation(false);
    setAiFeedback(null);
    setSessionScore(null);
    setRubricScores({
      timeSpaceCorrect: false,
      handledEdgeCases: false,
      communicationClear: false,
      optimumApproachSolved: false
    });
    setActiveMode('Mixed');
  };

  // Handle Submit Answer & AI Evaluation
  const submitHrAnswer = () => {
    if (!userAnswer.trim()) return;

    setIsEvaluating(true);
    setTimeout(() => {
      // Simulate constructive AI assessment
      const length = userAnswer.trim().length;
      let score = 50;
      let feedback = "";
      let strength = "";
      let improvement = "";

      if (length < 100) {
        score = 60;
        feedback = "Your answer is a bit too short and lacks concrete details. Interviewers appreciate thorough examples.";
        strength = "Conceivable point structure.";
        improvement = "Integrate the STAR framework (Situation, Task, Action, Result) to anchor your accomplishments.";
      } else {
        score = 80 + (length % 16);
        feedback = "Great job! You provided a structured answer outlining technical alignment and active communication.";
        strength = "Solid context setting and professional narrative flow.";
        improvement = "Elaborate slightly more on the quantifiable outcomes (e.g. % improvements, team hours saved).";
      }

      setAiFeedback({
        score,
        feedback,
        strength,
        improvement
      });
      setSessionScore(score);
      addMockRecord('HR', score, { questionTitle: activeQuestion.title || activeQuestion.question });
      setIsEvaluating(false);
    }, 1500);
  };

  // Submit DSA Evaluation based on self rubric
  const submitDsaEvaluation = () => {
    let checkedCount = 0;
    if (rubricScores.timeSpaceCorrect) checkedCount++;
    if (rubricScores.handledEdgeCases) checkedCount++;
    if (rubricScores.communicationClear) checkedCount++;
    if (rubricScores.optimumApproachSolved) checkedCount++;

    const baseScore = 40 + (checkedCount * 15);
    // Add variations
    const finalScore = Math.min(100, baseScore + (timeLeft > 1200 ? 5 : 0));
    setSessionScore(finalScore);
    addMockRecord('DSA', finalScore, { questionTitle: activeQuestion.title });
    setTimerRunning(false);
  };

  // Submit Mixed Round step by step
  const handleMixedNext = () => {
    // Accumulate step scores internally
    if (currentStep < 5) {
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);
      setActiveQuestion(mixedQuestionsList[nextStep]);
      setUserAnswer('');
      setShowExplanation(false);
      setAiFeedback(null);
    } else {
      // Complete mixed round! Calculate score
      const finalScore = Math.floor(75 + (Math.random() * 20));
      setSessionScore(finalScore);
      addMockRecord('Mixed', finalScore, { completedSteps: 6 });
    }
  };

  // Handle MCQ Option Selection & Submission
  const handleMcqSelect = (optIndex) => {
    if (selectedMcqOption !== null) return; // already answered

    setSelectedMcqOption(optIndex);
    const isCorrect = optIndex === activeQuestion.correctIndex;
    if (isCorrect) {
      setMcqScoreCount((prev) => prev + 1);
    }
    setShowExplanation(true);
  };

  const handleMcqNext = () => {
    if (currentStep < 9) {
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);
      setActiveQuestion(mcqQuestions[nextStep]);
      setSelectedMcqOption(null);
      setShowExplanation(false);
    } else {
      // Completed all 10 MCQs
      const finalScore = Math.round((mcqScoreCount / 10) * 100);
      setSessionScore(finalScore);
      addMockRecord('MCQ', finalScore, { correctAnswers: mcqScoreCount });
    }
  };

  const formatTime = (secs) => {
    const mins = Math.floor(secs / 60);
    const s = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Mode selection if null */}
      {!activeMode && (
        <div className="text-center space-y-8 py-8">
          <div className="space-y-3">
            <h2 className="text-3xl font-black text-slate-100 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
              Mock Interview Simulator
            </h2>
            <p className="text-slate-400 text-sm max-w-lg mx-auto">
              Simulate high-pressure interviews with custom timers, hints, feedback evaluation rubrics, and conceptual deep-dives.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* DSA Card */}
            <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between hover:border-cyan-500/40 transition-all group hover:shadow-[0_0_25px_rgba(6,182,212,0.1)] h-full">
              <div className="space-y-4 text-left">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 bg-cyan-500/10 rounded-xl flex items-center justify-center border border-cyan-500/20 text-cyan-400 font-bold text-xs">DSA</div>
                  <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Coding</span>
                </div>
                <h3 className="text-lg font-bold text-slate-100 group-hover:text-cyan-400 transition-colors">DSA Interview</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Get a random technical problem, a 45-minute strict countdown timer, follow-ups, and submit a self-evaluation scorecard.
                </p>
                <div className="space-y-1.5 pt-2 border-t border-slate-800/80">
                  <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">Syllabus Covered:</span>
                  <div className="flex flex-wrap gap-1">
                    {['Arrays', 'Strings', 'Trees', 'Graphs', 'DP', 'Recursion'].map(tag => (
                      <span key={tag} className="text-[9px] bg-slate-950/60 border border-slate-850 text-cyan-400/80 px-1.5 py-0.5 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <button
                onClick={startDsaRound}
                className="mt-6 w-full py-2.5 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 hover:from-cyan-500/25 hover:to-blue-500/25 border border-cyan-500/30 hover:border-cyan-400 text-cyan-300 hover:text-cyan-100 font-bold rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.05)] hover:shadow-[0_0_20px_rgba(6,182,212,0.15)]"
              >
                <Play className="w-4 h-4 mr-2 text-cyan-400" />
                Start DSA Round
              </button>
            </div>

            {/* HR Card */}
            <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between hover:border-violet-500/40 transition-all group hover:shadow-[0_0_25px_rgba(139,92,246,0.1)] h-full">
              <div className="space-y-4 text-left">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 bg-violet-500/10 rounded-xl flex items-center justify-center border border-violet-500/20 text-violet-400 font-bold text-xs">HR</div>
                  <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Behavioral</span>
                </div>
                <h3 className="text-lg font-bold text-slate-100 group-hover:text-violet-400 transition-colors">HR & Behavioral</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Practice questions on conflict resolution, leadership, failure, and strengths. Input your answer for simulated AI assessment.
                </p>
                <div className="space-y-1.5 pt-2 border-t border-slate-800/80">
                  <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">Syllabus Covered:</span>
                  <div className="flex flex-wrap gap-1">
                    {['Career pitch', 'Conflict Resolution', 'Leadership', 'Failure recovery', 'Strengths'].map(tag => (
                      <span key={tag} className="text-[9px] bg-slate-950/60 border border-slate-850 text-violet-400/80 px-1.5 py-0.5 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <button
                onClick={startHrRound}
                className="mt-6 w-full py-2.5 bg-gradient-to-r from-violet-500/10 to-fuchsia-500/10 hover:from-violet-500/25 hover:to-fuchsia-500/25 border border-violet-500/30 hover:border-violet-400 text-violet-300 hover:text-violet-100 font-bold rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer flex items-center justify-center shadow-[0_0_15px_rgba(139,92,246,0.05)] hover:shadow-[0_0_20px_rgba(139,92,246,0.15)]"
              >
                <Send className="w-4 h-4 mr-2 text-violet-400" />
                Start HR Round
              </button>
            </div>

            {/* Mixed Card */}
            <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between hover:border-amber-500/40 transition-all group hover:shadow-[0_0_25px_rgba(245,158,11,0.1)] h-full">
              <div className="space-y-4 text-left">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 bg-amber-500/10 rounded-xl flex items-center justify-center border border-amber-500/20 text-amber-400 font-bold text-xs">MIX</div>
                  <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Full Loop</span>
                </div>
                <h3 className="text-lg font-bold text-slate-100 group-hover:text-amber-400 transition-colors">Mixed Core Round</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  A full-loop interview combining DSA coding, OOP, DBMS, OS, Computer Networks, and behavioral HR questions.
                </p>
                <div className="space-y-1.5 pt-2 border-t border-slate-800/80">
                  <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">Syllabus Covered:</span>
                  <div className="flex flex-wrap gap-1">
                    {['DSA', 'OOP', 'DBMS', 'OS', 'Networks', 'HR pitch'].map(tag => (
                      <span key={tag} className="text-[9px] bg-slate-950/60 border border-slate-850 text-amber-400/80 px-1.5 py-0.5 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <button
                onClick={startMixedRound}
                className="mt-6 w-full py-2.5 bg-gradient-to-r from-amber-500/10 to-orange-500/10 hover:from-amber-500/25 hover:to-orange-500/25 border border-amber-500/30 hover:border-amber-400 text-amber-300 hover:text-amber-100 font-bold rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer flex items-center justify-center shadow-[0_0_15px_rgba(245,158,11,0.05)] hover:shadow-[0_0_20px_rgba(245,158,11,0.15)]"
              >
                <Sparkles className="w-4 h-4 mr-2 text-amber-400" />
                Start Mixed Round
              </button>
            </div>

            {/* MCQ Card */}
            <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between hover:border-rose-500/40 transition-all group hover:shadow-[0_0_25px_rgba(244,63,94,0.1)] h-full">
              <div className="space-y-4 text-left">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 bg-rose-500/10 rounded-xl flex items-center justify-center border border-rose-500/20 text-rose-400 font-bold text-xs">MCQ</div>
                  <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Quiz</span>
                </div>
                <h3 className="text-lg font-bold text-slate-100 group-hover:text-rose-400 transition-colors">CS MCQs Quiz</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Test your computer science fundamentals. Get a timed quiz of 10 randomized questions on OS, DBMS, Networks, OOP, and DSA.
                </p>
                <div className="space-y-1.5 pt-2 border-t border-slate-800/80">
                  <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">Syllabus Covered:</span>
                  <div className="flex flex-wrap gap-1">
                    {['Paging/OS', 'Joins/DBMS', 'TCP/UDP', 'SOLID/OOP', 'BST/Hashing'].map(tag => (
                      <span key={tag} className="text-[9px] bg-slate-950/60 border border-slate-850 text-rose-400/80 px-1.5 py-0.5 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <button
                onClick={startMcqRound}
                className="mt-6 w-full py-2.5 bg-gradient-to-r from-rose-500/10 to-pink-500/10 hover:from-rose-500/25 hover:to-pink-500/25 border border-rose-500/30 hover:border-rose-400 text-rose-300 hover:text-rose-100 font-bold rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer flex items-center justify-center shadow-[0_0_15px_rgba(244,63,94,0.05)] hover:shadow-[0_0_20px_rgba(244,63,94,0.15)]"
              >
                <CheckSquare className="w-4 h-4 mr-2 text-rose-400" />
                Start MCQ Quiz
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Active Interview Panel */}
      {activeMode && (
        <div className="space-y-6">
          {/* Header Panel */}
          <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4 backdrop-blur shadow-xl">
            <div>
              <span className="text-xs text-cyan-400 font-bold uppercase tracking-widest">{activeMode} Simulator</span>
              <h3 className="text-xl font-bold text-slate-100">
                {activeMode === 'Mixed' 
                  ? `Question ${currentStep + 1} of 6 — ${mixedQuestionsList[currentStep]?.type || 'DSA'}` 
                  : activeMode === 'MCQ'
                    ? `Question ${currentStep + 1} of 10 — ${activeQuestion?.category || 'CS Fundamentals'}`
                    : activeQuestion?.title || 'Mock Question'}
              </h3>
            </div>

            <div className="flex items-center gap-3">
              {/* DSA active clock */}
              {activeMode === 'DSA' && (
                <div className="flex items-center gap-2 bg-slate-950/80 border border-slate-800 px-4 py-2 rounded-xl text-slate-300">
                  <Clock className="w-4 h-4 text-cyan-400" />
                  <span className="font-mono font-bold text-sm">{formatTime(timeLeft)}</span>
                  <button onClick={() => setTimerRunning(!timerRunning)} className="p-1 text-slate-400 hover:text-slate-200">
                    {timerRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                  </button>
                </div>
              )}

              <button
                onClick={() => {
                  setTimerRunning(false);
                  setActiveMode(null);
                }}
                className="px-4 py-2 text-xs bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-400 font-bold rounded-xl transition-all cursor-pointer"
              >
                Quit Session
              </button>
            </div>
          </div>

          {/* Question Display Card */}
          <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6 backdrop-blur shadow-2xl">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-slate-400 text-xs font-semibold">
                <HelpCircle className="w-4 h-4 text-cyan-400" />
                <span>
                  {activeMode === 'MCQ' ? 'Choose the correct option:' : 'Interviewer Question:'}
                </span>
              </div>
              <h4 className="text-xl md:text-2xl font-black text-slate-100 leading-relaxed">
                {activeMode === 'Mixed' 
                  ? (activeQuestion?.question || activeQuestion?.title || activeQuestion?.problemStatement || 'No question loaded.')
                  : activeMode === 'MCQ'
                    ? activeQuestion?.question
                    : activeQuestion?.title || activeQuestion?.question || activeQuestion?.problemStatement}
              </h4>
              {(activeMode === 'DSA' || (activeMode === 'Mixed' && activeQuestion?.type === 'DSA')) && (
                <p className="text-slate-400 text-sm italic">
                  Take a sheet of paper or code editor, talk through your algorithm, and implement it.
                </p>
              )}
            </div>

            {/* Answer Box for HR / Mixed (Conceptual steps) */}
            {(activeMode === 'HR' || (activeMode === 'Mixed' && activeQuestion?.type !== 'DSA')) && (
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">Type Your Answer Response</label>
                <textarea
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  placeholder="Record your explanation here. Focus on naming frameworks, structures, and key complexities..."
                  className="w-full h-40 bg-slate-950/40 border border-slate-800 focus:border-cyan-500 rounded-xl p-4 text-slate-200 placeholder-slate-600 focus:ring-1 focus:ring-cyan-500 focus:outline-none transition-all text-sm resize-none"
                />
              </div>
            )}

            {/* MCQ Quiz Interactive Options */}
            {activeMode === 'MCQ' && (
              <div className="grid grid-cols-1 gap-3 pt-2">
                {activeQuestion?.options.map((option, idx) => {
                  const isAnswered = selectedMcqOption !== null;
                  const isChosen = selectedMcqOption === idx;
                  const isCorrect = idx === activeQuestion.correctIndex;

                  let btnStyle = "bg-slate-900/40 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-800/20";
                  if (isAnswered) {
                    if (isCorrect) {
                      btnStyle = "bg-emerald-500/10 border-emerald-500/50 text-emerald-400 font-bold shadow-[0_0_15px_rgba(16,185,129,0.1)]";
                    } else if (isChosen) {
                      btnStyle = "bg-rose-500/10 border-rose-500/50 text-rose-400 font-bold";
                    } else {
                      btnStyle = "bg-slate-950/20 border-slate-900 text-slate-500 opacity-60";
                    }
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleMcqSelect(idx)}
                      disabled={isAnswered}
                      className={`w-full text-left px-5 py-4 border rounded-xl transition-all duration-200 flex items-center justify-between text-sm ${btnStyle}`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-lg bg-slate-950/80 border border-slate-800 text-[11px] font-bold flex items-center justify-center text-slate-400">
                          {String.fromCharCode(65 + idx)}
                        </span>
                        <span>{option}</span>
                      </div>
                      {isAnswered && isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />}
                    </button>
                  );
                })}
              </div>
            )}

            {/* DSA/Mixed Rubric Checkboxes & Hint Panel */}
            {(activeMode === 'DSA' || (activeMode === 'Mixed' && activeQuestion?.type === 'DSA')) && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-800/80">
                {/* Hints */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h5 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Helpful Hints</h5>
                    {revealedHintsCount < activeQuestion?.hints.length && (
                      <button
                        onClick={() => setRevealedHintsCount(c => c + 1)}
                        className="text-xs text-cyan-400 hover:text-cyan-300 font-semibold cursor-pointer"
                      >
                        Reveal Hint
                      </button>
                    )}
                  </div>
                  <div className="space-y-2">
                    {Array.from({ length: revealedHintsCount }).map((_, idx) => (
                      <div key={idx} className="bg-slate-950/30 border border-slate-800/60 rounded-xl p-3 text-xs text-slate-300">
                        <strong className="text-cyan-400 mr-1">Hint {idx + 1}:</strong> {activeQuestion?.hints[idx]}
                      </div>
                    ))}
                    {revealedHintsCount === 0 && (
                      <p className="text-xs text-slate-500 italic">No hints revealed. Click to reveal if you are stuck.</p>
                    )}
                  </div>
                </div>

                {/* Rubric evaluation */}
                <div className="space-y-3">
                  <h5 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                    <CheckSquare className="w-4 h-4 text-cyan-400" />
                    Self-Evaluation Rubric
                  </h5>
                  <div className="space-y-2 bg-slate-950/20 border border-slate-800/60 rounded-xl p-4">
                    <label className="flex items-center gap-3 text-sm text-slate-300 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={rubricScores.timeSpaceCorrect}
                        onChange={(e) => setRubricScores({ ...rubricScores, timeSpaceCorrect: e.target.checked })}
                        className="rounded border-slate-700 text-cyan-500 focus:ring-cyan-500 bg-slate-900"
                      />
                      <span>Correctly stated Time/Space Complexity</span>
                    </label>
                    <label className="flex items-center gap-3 text-sm text-slate-300 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={rubricScores.handledEdgeCases}
                        onChange={(e) => setRubricScores({ ...rubricScores, handledEdgeCases: e.target.checked })}
                        className="rounded border-slate-700 text-cyan-500 focus:ring-cyan-500 bg-slate-900"
                      />
                      <span>Identified edge cases (e.g. empty, bounds)</span>
                    </label>
                    <label className="flex items-center gap-3 text-sm text-slate-300 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={rubricScores.communicationClear}
                        onChange={(e) => setRubricScores({ ...rubricScores, communicationClear: e.target.checked })}
                        className="rounded border-slate-700 text-cyan-500 focus:ring-cyan-500 bg-slate-900"
                      />
                      <span>Communicated thoughts continuously</span>
                    </label>
                    <label className="flex items-center gap-3 text-sm text-slate-300 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={rubricScores.optimumApproachSolved}
                        onChange={(e) => setRubricScores({ ...rubricScores, optimumApproachSolved: e.target.checked })}
                        className="rounded border-slate-700 text-cyan-500 focus:ring-cyan-500 bg-slate-900"
                      />
                      <span>Implemented the optimal approach</span>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3 pt-4 border-t border-slate-800/60 justify-between items-center">
              <div>
                {activeMode !== 'MCQ' && (
                  <button
                    onClick={() => setShowExplanation(!showExplanation)}
                    className="px-4 py-2 text-xs bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 font-bold rounded-xl transition-all cursor-pointer"
                  >
                    {showExplanation ? 'Hide Model Answer' : 'Reveal Model Answer'}
                  </button>
                )}
              </div>

              {activeMode === 'HR' && (
                <button
                  disabled={!userAnswer.trim() || isEvaluating}
                  onClick={submitHrAnswer}
                  className="px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-500 disabled:opacity-40 disabled:pointer-events-none text-white font-bold rounded-xl transition-all flex items-center gap-2 cursor-pointer"
                >
                  {isEvaluating ? (
                    <>Evaluating... <RefreshCw className="w-4 h-4 animate-spin" /></>
                  ) : (
                    <>Submit For AI Feedback <Send className="w-4 h-4" /></>
                  )}
                </button>
              )}

              {activeMode === 'DSA' && !sessionScore && (
                <button
                  onClick={submitDsaEvaluation}
                  className="px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold rounded-xl transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  Submit Scorecard <Award className="w-4.5 h-4.5" />
                </button>
              )}

              {activeMode === 'Mixed' && (
                <button
                  onClick={handleMixedNext}
                  className="px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold rounded-xl transition-all flex items-center gap-1 cursor-pointer"
                >
                  {currentStep === 5 ? 'Finish & Grade' : 'Next Question'} <ChevronRight className="w-4 h-4" />
                </button>
              )}

              {activeMode === 'MCQ' && selectedMcqOption !== null && (
                <button
                  onClick={handleMcqNext}
                  className="px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold rounded-xl transition-all flex items-center gap-1 cursor-pointer"
                >
                  {currentStep === 9 ? 'Complete Quiz' : 'Next MCQ'} <ChevronRight className="w-4.5 h-4.5" />
                </button>
              )}
            </div>

            {/* Answer / Explanation Display */}
            <AnimatePresence>
              {showExplanation && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="bg-slate-950/50 border border-slate-800 rounded-xl p-5 text-sm text-slate-300 space-y-3 overflow-hidden"
                >
                  <h5 className="font-bold text-slate-200">
                    {activeMode === 'MCQ' ? 'Explanation:' : 'Suggested Model Answer:'}
                  </h5>
                  <p className="whitespace-pre-line leading-relaxed">
                    {activeMode === 'MCQ'
                      ? activeQuestion?.explanation
                      : activeQuestion?.solutionApproach || activeQuestion?.answer || activeQuestion?.modelAnswer || activeQuestion?.approach || 'See the standard solution for this question.'}
                  </p>
                  {activeMode !== 'MCQ' && activeQuestion?.followUps && activeQuestion.followUps.length > 0 && (
                    <div className="pt-2">
                      <strong className="text-xs text-slate-400 uppercase tracking-wider block mb-1">Follow-ups:</strong>
                      <ul className="list-disc pl-5 space-y-1 text-xs text-slate-400">
                        {activeQuestion.followUps.map((fol, i) => (
                          <li key={i}>{fol}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Feedback Card Display */}
          <AnimatePresence>
            {aiFeedback && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-slate-900/40 border border-violet-500/20 rounded-2xl p-6 space-y-4 backdrop-blur shadow-2xl"
              >
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-violet-400" />
                    <h4 className="text-lg font-bold text-slate-200">AI Assessment Result</h4>
                  </div>
                  <div className="bg-violet-500/10 border border-violet-500/30 text-violet-400 font-mono font-black text-lg px-3 py-1 rounded-xl">
                    Score: {aiFeedback.score}%
                  </div>
                </div>

                <div className="space-y-3 text-sm">
                  <p className="text-slate-300">{aiFeedback.feedback}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                    <div className="bg-emerald-500/5 border border-emerald-500/25 rounded-xl p-3">
                      <strong className="text-xs text-emerald-400 uppercase tracking-wider block mb-1">Strengths:</strong>
                      <p className="text-xs text-slate-300">{aiFeedback.strength}</p>
                    </div>
                    <div className="bg-amber-500/5 border border-amber-500/25 rounded-xl p-3">
                      <strong className="text-xs text-amber-400 uppercase tracking-wider block mb-1">Areas for improvement:</strong>
                      <p className="text-xs text-slate-300">{aiFeedback.improvement}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Session Finished Summary Card */}
          {sessionScore !== null && activeMode !== 'HR' && (
            <div className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-2xl p-8 text-center space-y-4 shadow-2xl">
              <Award className="w-16 h-16 text-yellow-400 mx-auto animate-bounce" />
              <h3 className="text-2xl font-black text-slate-100">
                {activeMode === 'MCQ' ? 'Quiz Completed!' : 'Mock Session Completed!'}
              </h3>
              <p className="text-slate-400 text-sm max-w-md mx-auto">
                {activeMode === 'MCQ'
                  ? `You successfully answered ${mcqScoreCount} out of 10 computer science fundamental questions correctly.`
                  : `Excellent focus. You completed the ${activeMode} preparation set. Your scorecard evaluation has been recorded.`}
              </p>
              <div className="inline-block bg-slate-900/60 border border-slate-800 rounded-2xl px-8 py-3 text-center">
                <span className="text-slate-500 text-xs uppercase tracking-wider block">Assessment Grade</span>
                <span className="text-4xl font-mono font-black text-cyan-400">{sessionScore}%</span>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => {
                    setActiveMode(null);
                    setSessionScore(null);
                  }}
                  className="px-6 py-2.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 font-bold rounded-xl transition-all cursor-pointer"
                >
                  Back to Selector
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
