import { TrendingUp } from 'lucide-react'

const TOPIC_DATA = {
  'Binary Search': {
    difficulty: 'Medium',
    frequency: 'Very High',
    companies: ['Google', 'Amazon', 'Microsoft', 'Adobe', 'Apple'],
    concepts: ['Mid Calculation', 'Boundary Conditions', 'Time Complexity O(log n)', 'Space Complexity O(1)'],
    mistakes: ['Infinite Loops', 'Wrong Mid Calculation', 'Off-by-one Errors', 'Infinite Recursion'],
  },
  'Sliding Window': {
    difficulty: 'Medium',
    frequency: 'Very High',
    companies: ['Google', 'Facebook', 'Microsoft', 'Amazon', 'Apple'],
    concepts: ['Two Pointers', 'Substring/Subarray', 'Time Complexity O(n)', 'Fixed & Dynamic Windows'],
    mistakes: ['Incorrect Window Size', 'Missing Edge Cases', 'Wrong Expansion/Contraction'],
  },
  'Trees': {
    difficulty: 'Hard',
    frequency: 'Very High',
    companies: ['Google', 'Amazon', 'Microsoft', 'Apple', 'Facebook'],
    concepts: ['Traversals (DFS/BFS)', 'Binary Trees', 'BST', 'Recursion', 'Level Order'],
    mistakes: ['Null Pointer Exceptions', 'Incorrect Traversal', 'Stack Overflow'],
  },
  'Graphs': {
    difficulty: 'Hard',
    frequency: 'High',
    companies: ['Google', 'Amazon', 'Microsoft', 'Facebook', 'Uber'],
    concepts: ['DFS', 'BFS', 'Dijkstra', 'Floyd-Warshall', 'Topological Sort'],
    mistakes: ['Visited Tracking', 'Infinite Loops', 'Incorrect Path Finding'],
  },
  'Dynamic Programming': {
    difficulty: 'Hard',
    frequency: 'Very High',
    companies: ['Google', 'Amazon', 'Microsoft', 'Apple', 'Facebook'],
    concepts: ['Memoization', 'Tabulation', 'Overlapping Subproblems', 'Optimal Substructure'],
    mistakes: ['Wrong Base Case', 'Missing Memoization', 'TLE from Recomputation'],
  },
  'Hashing': {
    difficulty: 'Easy',
    frequency: 'High',
    companies: ['Google', 'Amazon', 'Microsoft', 'Apple', 'Facebook'],
    concepts: ['Hash Maps', 'Hash Sets', 'Collision Handling', 'Time Complexity O(1)'],
    mistakes: ['Collision Mishandling', 'Memory Overuse', 'Incorrect Key Selection'],
  },
  'Stacks & Queues': {
    difficulty: 'Medium',
    frequency: 'High',
    companies: ['Google', 'Amazon', 'Microsoft', 'Apple', 'Facebook'],
    concepts: ['LIFO/FIFO', 'Monotonic Stack', 'Deque', 'Stack Problems'],
    mistakes: ['Empty Stack Access', 'Wrong Order', 'Memory Issues'],
  },
  'Linked Lists': {
    difficulty: 'Medium',
    frequency: 'High',
    companies: ['Google', 'Amazon', 'Microsoft', 'Apple', 'Facebook'],
    concepts: ['Node Manipulation', 'Pointer Reassignment', 'Cycle Detection', 'Merging'],
    mistakes: ['Null Pointer Errors', 'Lost Node References', 'Infinite Cycles'],
  },
  'Sorting': {
    difficulty: 'Medium',
    frequency: 'Medium',
    companies: ['Google', 'Amazon', 'Microsoft', 'Apple', 'Facebook'],
    concepts: ['Time Complexity', 'Space Complexity', 'Stable Sorting', 'Custom Comparators'],
    mistakes: ['Wrong Algorithm Choice', 'Inefficient Implementation'],
  },
  'Greedy': {
    difficulty: 'Medium',
    frequency: 'Medium',
    companies: ['Google', 'Amazon', 'Microsoft', 'Apple', 'Facebook'],
    concepts: ['Optimal Choices', 'Problem Proof', 'Exchange Arguments'],
    mistakes: ['Non-optimal Choice', 'Missing Proof', 'Edge Cases'],
  },
  'Backtracking': {
    difficulty: 'Hard',
    frequency: 'High',
    companies: ['Google', 'Amazon', 'Microsoft', 'Apple', 'Facebook'],
    concepts: ['Recursion', 'State Space', 'Pruning', 'N-Queens', 'Sudoku'],
    mistakes: ['Not Restoring State', 'Inefficient Pruning', 'Stack Overflow'],
  },
  'Two Pointers': {
    difficulty: 'Easy',
    frequency: 'High',
    companies: ['Google', 'Amazon', 'Microsoft', 'Apple', 'Facebook'],
    concepts: ['Opposite Direction', 'Same Direction', 'Merging', 'Partition'],
    mistakes: ['Wrong Pointer Direction', 'Index Out of Bounds'],
  },
}

export default function TopicOverview({ topic }) {
  const data = TOPIC_DATA[topic] || TOPIC_DATA['Binary Search']

  const frequencyColor = {
    'Very High': 'text-red-400 bg-red-400/10',
    High: 'text-orange-400 bg-orange-400/10',
    Medium: 'text-yellow-400 bg-yellow-400/10',
    Low: 'text-green-400 bg-green-400/10',
  }

  const difficultyColor = {
    Easy: 'text-green-400 bg-green-400/10',
    Medium: 'text-yellow-400 bg-yellow-400/10',
    Hard: 'text-red-400 bg-red-400/10',
  }

  return (
    <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-2xl border border-slate-700/50 p-8 backdrop-blur">
      <h2 className="text-3xl font-bold text-slate-100 mb-6">{topic}</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Column */}
        <div className="space-y-6">
          {/* Difficulty & Frequency */}
          <div className="flex gap-4">
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase mb-2">Difficulty</p>
              <span className={`inline-block text-sm font-bold px-3 py-1 rounded-lg ${difficultyColor[data.difficulty]}`}>
                {data.difficulty}
              </span>
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase mb-2">Interview Frequency</p>
              <span className={`inline-block text-sm font-bold px-3 py-1 rounded-lg ${frequencyColor[data.frequency]}`}>
                {data.frequency}
              </span>
            </div>
          </div>

          {/* Companies */}
          <div>
            <h3 className="text-sm font-semibold text-slate-300 mb-3 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-cyan-400" />
              Asked By
            </h3>
            <div className="flex flex-wrap gap-2">
              {data.companies.map((company) => (
                <span
                  key={company}
                  className="px-3 py-1 bg-slate-700/50 rounded-lg text-sm font-semibold text-slate-200"
                >
                  {company}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Key Concepts */}
          <div>
            <h3 className="text-sm font-semibold text-slate-300 mb-3">Key Concepts</h3>
            <ul className="space-y-2">
              {data.concepts.map((concept) => (
                <li key={concept} className="text-sm text-slate-300 flex gap-2">
                  <span className="text-cyan-400 flex-shrink-0">→</span>
                  <span>{concept}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Common Mistakes */}
          <div>
            <h3 className="text-sm font-semibold text-slate-300 mb-3">Common Mistakes</h3>
            <ul className="space-y-2">
              {data.mistakes.map((mistake) => (
                <li key={mistake} className="text-sm text-slate-300 flex gap-2">
                  <span className="text-red-400 flex-shrink-0">✗</span>
                  <span>{mistake}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
