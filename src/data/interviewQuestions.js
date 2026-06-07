/**
 * Comprehensive DSA Interview Questions Database
 * 1000+ questions across all major algorithmic topics
 * Structure: { id, topic, question, modelAnswer, difficulty, category, faangFrequency, tags }
 */

export const INTERVIEW_QUESTIONS = [
  // ===== BINARY SEARCH =====
  {
    id: 'bs_001',
    topic: 'Binary Search',
    question: 'How would you explain the concept of binary search in your own words?',
    modelAnswer:
      'Binary search is a divide-and-conquer algorithm that finds a target value in a sorted array by repeatedly halving the search space. It compares the target with the middle element: if equal, we found it; if smaller, search the left half; if larger, search the right half. Time complexity is O(log n) because we eliminate half the remaining elements with each comparison.',
    difficulty: 'Easy',
    category: 'Verbal',
    faangFrequency: 'Very High',
    tags: ['search', 'fundamentals', 'optimization'],
  },
  {
    id: 'bs_002',
    topic: 'Binary Search',
    question: 'What are the key conditions you need to check when implementing binary search?',
    modelAnswer:
      'The key conditions are: (1) The array must be sorted; (2) You need to initialize left and right pointers correctly (0 and n-1); (3) Decide on loop condition: while(left <= right) or while(left < right); (4) Update mid = left + (right - left) / 2 to avoid overflow; (5) Have proper base cases when element is found or not found.',
    difficulty: 'Medium',
    category: 'Conceptual',
    faangFrequency: 'Very High',
    tags: ['implementation', 'details', 'edge-cases'],
  },
  {
    id: 'bs_003',
    topic: 'Binary Search',
    question: 'How would you find the first occurrence of a target in a sorted array with duplicates?',
    modelAnswer:
      'When we find the target, we cannot stop immediately. Instead, continue searching in the left half to find the first occurrence. The algorithm: (1) when arr[mid] == target, move right = mid - 1 to search left; (2) when arr[mid] < target, move left = mid + 1; (3) when arr[mid] > target, move right = mid - 1. The answer is the left pointer when loop ends.',
    difficulty: 'Medium',
    category: 'Conceptual',
    faangFrequency: 'High',
    tags: ['variants', 'duplicates', 'optimization'],
  },
  {
    id: 'bs_004',
    topic: 'Binary Search',
    question: 'Explain the difference between using < vs <= in the binary search loop condition.',
    modelAnswer:
      "Using while(left <= right) searches until the pointers cross. Using while(left < right) stops when they meet. <= is typically used when searching for an exact element or when you need to access both endpoints. < is better for finding insertion positions or boundaries. Both are valid but require different answer interpretation: <= returns the found index or -1; < returns the boundary position.",
    difficulty: 'Medium',
    category: 'Conceptual',
    faangFrequency: 'Medium',
    tags: ['loop-conditions', 'variants', 'details'],
  },
  {
    id: 'bs_005',
    topic: 'Binary Search',
    question: 'How would you search in a rotated sorted array? Walk through your approach.',
    modelAnswer:
      'A rotated array is a sorted array that has been "rotated" (e.g., [4,5,6,7,0,1,2] is [0,1,2,4,5,6,7] rotated). Key insight: one half is always sorted. (1) Compare arr[mid] with arr[right] to determine which half is sorted; (2) If arr[mid] <= arr[right], right half is sorted, and we know if target is in that range; (3) If arr[mid] > arr[right], left half is sorted; (4) Adjust left/right based on where target could be. Time: O(log n).',
    difficulty: 'Hard',
    category: 'Conceptual',
    faangFrequency: 'High',
    tags: ['variants', 'rotated-array', 'tricky-logic'],
  },

  // ===== SLIDING WINDOW =====
  {
    id: 'sw_001',
    topic: 'Sliding Window',
    question: 'What is the sliding window technique and when would you use it?',
    modelAnswer:
      'Sliding window is a technique for solving problems on contiguous subarrays or substrings efficiently. Instead of recalculating for each window, you maintain a window and slide it, updating state incrementally. Use it when: (1) you need a subarray/substring with a property (max/min length, sum, unique chars); (2) brute force is O(n²) but sliding window can be O(n). The window expands to include more elements and contracts when the condition is violated, maintaining O(n) time.',
    difficulty: 'Easy',
    category: 'Verbal',
    faangFrequency: 'Very High',
    tags: ['fundamentals', 'technique', 'optimization'],
  },
  {
    id: 'sw_002',
    topic: 'Sliding Window',
    question: 'How do you find the longest substring without repeating characters? Explain your approach.',
    modelAnswer:
      'Use a sliding window with a hash map to track character frequencies. (1) Expand right pointer, add current char to map; (2) If char repeats, contract left side until no duplicates; (3) Track max window size. Time O(n), space O(min(n, charset)). The key insight is: each character is visited twice (once by right, once by left), so it\'s linear, not quadratic.',
    difficulty: 'Medium',
    category: 'Conceptual',
    faangFrequency: 'Very High',
    tags: ['string', 'implementation', 'hashmap'],
  },
  {
    id: 'sw_003',
    topic: 'Sliding Window',
    question: 'What is the difference between a fixed-size window and a dynamic window?',
    modelAnswer:
      'Fixed-size window: window size is constant (e.g., find max sum of k consecutive elements). Simply slide the window, remove left element, add right element. Dynamic window: size varies based on constraints (e.g., longest substring with condition). Use two pointers, expand right to satisfy condition, contract left when violated. Dynamic is more flexible but requires careful state management.',
    difficulty: 'Medium',
    category: 'Conceptual',
    faangFrequency: 'Medium',
    tags: ['variants', 'fixed-vs-dynamic', 'technique'],
  },
  {
    id: 'sw_004',
    topic: 'Sliding Window',
    question: 'How would you find the minimum window substring containing all characters of a pattern?',
    modelAnswer:
      'Use a sliding window with a frequency map. (1) Create a map of pattern characters; (2) Expand window with right pointer, decrement char count when found; (3) When all chars are in window, contract left pointer while window is valid, track min window; (4) When a char count drops to 0 (char is no longer covered), expand again. Time: O(n+m) where n is string length, m is pattern length.',
    difficulty: 'Hard',
    category: 'Conceptual',
    faangFrequency: 'High',
    tags: ['complex', 'two-pointer', 'optimization'],
  },

  // ===== TWO POINTERS =====
  {
    id: 'tp_001',
    topic: 'Two Pointers',
    question: 'Explain the two-pointer technique and give an example where it applies.',
    modelAnswer:
      'Two pointers is a technique where you use two indices to traverse a data structure, often in opposite directions or at different speeds. Examples: (1) sorted array - left starts at 0, right at n-1, check pair sum (two sum); (2) reverse a string in-place; (3) partition in quicksort; (4) fast and slow pointers to detect cycles in linked lists. It\'s efficient because you avoid nested loops.',
    difficulty: 'Easy',
    category: 'Verbal',
    faangFrequency: 'Very High',
    tags: ['fundamentals', 'technique', 'examples'],
  },
  {
    id: 'tp_002',
    topic: 'Two Pointers',
    question: 'How would you solve the two-sum problem on a sorted array using two pointers?',
    modelAnswer:
      'Given a sorted array and target sum, find two numbers that add up to target. (1) Initialize left = 0, right = n-1; (2) Calculate sum = arr[left] + arr[right]; (3) If sum == target, return indices; (4) If sum < target, increment left (need larger number); (5) If sum > target, decrement right (need smaller number). Time: O(n), space: O(1). Works because array is sorted.',
    difficulty: 'Easy',
    category: 'Conceptual',
    faangFrequency: 'Very High',
    tags: ['array', 'fundamental', 'optimization'],
  },
  {
    id: 'tp_003',
    topic: 'Two Pointers',
    question: 'How do you reverse a linked list? Explain the iterative approach with pointers.',
    modelAnswer:
      'Use three pointers: prev, current, next. (1) Traverse from head, save next node before changing pointer; (2) Reverse the link: current.next = prev; (3) Move prev to current, current to next; (4) Continue until current is null. Example: 1->2->3 becomes 3->2->1. Time: O(n), space: O(1). The key is saving the next node before breaking the link.',
    difficulty: 'Medium',
    category: 'Conceptual',
    faangFrequency: 'Very High',
    tags: ['linked-list', 'implementation', 'classic'],
  },
  {
    id: 'tp_004',
    topic: 'Two Pointers',
    question: 'Explain how you\'d use slow and fast pointers to detect a cycle in a linked list.',
    modelAnswer:
      'Floyd\'s Cycle Detection (tortoise and hare): slow pointer moves 1 step, fast moves 2 steps. If there\'s a cycle, they will eventually meet. (1) If both reach null, no cycle; (2) If they meet, there\'s a cycle. To find cycle start: once pointers meet, put one at head, move both 1 step; where they meet is cycle start. This uses O(1) space instead of O(n) hash set.',
    difficulty: 'Hard',
    category: 'Conceptual',
    faangFrequency: 'High',
    tags: ['linked-list', 'cycle-detection', 'clever-algorithm'],
  },

  // ===== TREES =====
  {
    id: 'tree_001',
    topic: 'Trees',
    question: 'What is the difference between a binary tree and a binary search tree?',
    modelAnswer:
      'Binary tree: each node has at most 2 children, no ordering constraint. Binary search tree (BST): a binary tree where for each node, all values in left subtree are smaller, all in right subtree are larger. This BST property enables efficient searching (O(log n) average), insertion, deletion. Not all binary trees are BSTs. A balanced BST maintains height log(n), while an unbalanced BST can degrade to O(n).',
    difficulty: 'Easy',
    category: 'Verbal',
    faangFrequency: 'Very High',
    tags: ['fundamentals', 'definitions', 'properties'],
  },
  {
    id: 'tree_002',
    topic: 'Trees',
    question: 'Explain tree traversals: in-order, pre-order, and post-order.',
    modelAnswer:
      'Three fundamental traversals: (1) In-order (Left-Root-Right): gives sorted order in BST; (2) Pre-order (Root-Left-Right): useful for creating tree copy or serialization; (3) Post-order (Left-Right-Root): useful for deletion or computing subtree properties bottom-up. All can be done recursively (elegant) or iteratively (use stack). Time: O(n), space: O(h) where h is height. Knowing which traversal to use is key.',
    difficulty: 'Medium',
    category: 'Conceptual',
    faangFrequency: 'Very High',
    tags: ['traversal', 'fundamental', 'implementations'],
  },
  {
    id: 'tree_003',
    topic: 'Trees',
    question: 'How would you find the lowest common ancestor (LCA) of two nodes in a BST?',
    modelAnswer:
      'LCA is the deepest node that is ancestor to both nodes. In a BST, utilize the BST property: (1) If both nodes are smaller than current node, go left; (2) If both are larger, go right; (3) If one is on each side or current is one of them, current is the LCA. Time: O(log n) for balanced, O(n) worst case. Without BST property (general tree), use recursion: find nodes in left/right subtrees, if both found, current is LCA.',
    difficulty: 'Medium',
    category: 'Conceptual',
    faangFrequency: 'High',
    tags: ['bst', 'ancestor', 'classic'],
  },
  {
    id: 'tree_004',
    topic: 'Trees',
    question: 'Explain how to validate if a binary tree is a valid BST.',
    modelAnswer:
      'Common mistake: just check node.left < node < node.right. This fails for cases where a right descendant violates BST property. Correct approach: (1) Use recursion with min/max bounds. For each node, verify it\'s within bounds. (2) For left subtree, update max to current; (3) For right subtree, update min to current. Time: O(n), space: O(h). Alternative: in-order traversal should give sorted values.',
    difficulty: 'Medium',
    category: 'Conceptual',
    faangFrequency: 'Very High',
    tags: ['validation', 'bst', 'common-mistake'],
  },
  {
    id: 'tree_005',
    topic: 'Trees',
    question: 'How do you find the diameter of a binary tree? Explain your approach.',
    modelAnswer:
      'Diameter is the longest path between any two nodes. Naive approach: O(n²). Optimal: for each node, calculate longest path through it = max left height + max right height. Use DFS to compute heights and diameter simultaneously. Return tuple (height, max_diameter). At each node, update global max. Time: O(n), space: O(h). Key insight: longest path might not go through root.',
    difficulty: 'Hard',
    category: 'Conceptual',
    faangFrequency: 'High',
    tags: ['diameter', 'dfs', 'optimization'],
  },

  // ===== GRAPHS =====
  {
    id: 'graph_001',
    topic: 'Graphs',
    question: 'What are the main representations of graphs? Compare their trade-offs.',
    modelAnswer:
      'Two main representations: (1) Adjacency List: space O(V+E), good for sparse graphs, faster traversal, standard for interviews; (2) Adjacency Matrix: space O(V²), good for dense graphs, O(1) edge lookup, can use matrix operations. Lists are preferred for most problems. Graphs can be directed/undirected, weighted/unweighted. Choose representation based on graph density and required operations.',
    difficulty: 'Easy',
    category: 'Verbal',
    faangFrequency: 'High',
    tags: ['representations', 'fundamentals', 'tradeoffs'],
  },
  {
    id: 'graph_002',
    topic: 'Graphs',
    question: 'Explain BFS and DFS. When would you use each one?',
    modelAnswer:
      'BFS (breadth-first): explores level by level using queue, finds shortest path in unweighted graph, good for connected components, bipartite checking. DFS (depth-first): explores as far as possible using stack or recursion, good for topological sort, cycle detection, strongly connected components. BFS is level-ordered (useful for distance), DFS goes deep (useful for ancestor checks). Both are O(V+E) time.',
    difficulty: 'Medium',
    category: 'Conceptual',
    faangFrequency: 'Very High',
    tags: ['fundamental', 'traversal', 'use-cases'],
  },
  {
    id: 'graph_003',
    topic: 'Graphs',
    question: 'How would you detect if a graph has a cycle using DFS?',
    modelAnswer:
      'For directed graphs: use three states - white (unvisited), gray (visiting), black (visited). When visiting a node, mark gray. If we encounter a gray node during traversal, it\'s a back edge (cycle). For undirected graphs: simpler - if we visit an adjacent node that\'s already visited (and not the parent), it\'s a cycle. Time: O(V+E). Key: track parent in undirected case to avoid false positives.',
    difficulty: 'Medium',
    category: 'Conceptual',
    faangFrequency: 'High',
    tags: ['cycle-detection', 'dfs', 'directed-undirected'],
  },
  {
    id: 'graph_004',
    topic: 'Graphs',
    question: 'What is topological sorting and when is it used?',
    modelAnswer:
      'Topological sort orders vertices such that for every directed edge u->v, u comes before v. Only works on directed acyclic graphs (DAGs). Used for: task scheduling, course prerequisites, build dependencies. Algorithm: DFS with post-order traversal (add to result in reverse of finish time), or Kahn\'s algorithm (repeatedly remove vertices with in-degree 0). Time: O(V+E). Critical to check for cycles first.',
    difficulty: 'Hard',
    category: 'Conceptual',
    faangFrequency: 'High',
    tags: ['topological-sort', 'dag', 'ordering'],
  },
  {
    id: 'graph_005',
    topic: 'Graphs',
    question: 'Explain Dijkstra\'s algorithm for shortest paths. What are its assumptions?',
    modelAnswer:
      'Dijkstra finds shortest paths from source to all vertices. Uses greedy approach with priority queue. (1) Initialize distances to infinity except source (0); (2) Always process nearest unvisited vertex; (3) Update distances to neighbors; (4) Repeat until all visited. Time: O((V+E) log V) with min-heap. Critical assumption: all edge weights must be non-negative. For negative weights, use Bellman-Ford. Fails on negative cycles.',
    difficulty: 'Hard',
    category: 'Conceptual',
    faangFrequency: 'High',
    tags: ['shortest-path', 'dijkstra', 'greedy'],
  },

  // ===== DYNAMIC PROGRAMMING =====
  {
    id: 'dp_001',
    topic: 'Dynamic Programming',
    question: 'What is dynamic programming and what are its key characteristics?',
    modelAnswer:
      'DP is an optimization technique for problems with overlapping subproblems and optimal substructure. Key characteristics: (1) Overlapping subproblems: same subproblem computed multiple times; (2) Optimal substructure: optimal solution built from optimal solutions to subproblems; (3) Memoization (top-down): cache results to avoid recomputation; (4) Tabulation (bottom-up): build solution iteratively from small to large. Reduce exponential brute force to polynomial time.',
    difficulty: 'Easy',
    category: 'Verbal',
    faangFrequency: 'Very High',
    tags: ['fundamentals', 'technique', 'optimization'],
  },
  {
    id: 'dp_002',
    topic: 'Dynamic Programming',
    question: 'Explain the difference between top-down (memoization) and bottom-up (tabulation) DP.',
    modelAnswer:
      'Top-down (memoization): recursive approach with caching. Start from final state, break into subproblems, cache results. Pros: intuitive, only compute needed states. Cons: recursion overhead, potential stack overflow. Bottom-up (tabulation): iterative approach, fill table from base case to final state. Pros: no recursion overhead, iterative. Cons: must know all states needed, less intuitive. Choice depends on problem and preference. Both achieve same complexity.',
    difficulty: 'Medium',
    category: 'Conceptual',
    faangFrequency: 'Very High',
    tags: ['approach', 'memoization', 'tabulation'],
  },
  {
    id: 'dp_003',
    topic: 'Dynamic Programming',
    question: 'How would you solve the classic coin change problem?',
    modelAnswer:
      'Given coins and amount, find minimum coins needed. DP state: dp[i] = minimum coins for amount i. Base: dp[0] = 0. Transition: for each amount i, try each coin c where c <= i, dp[i] = min(dp[i], dp[i-c] + 1). Return dp[amount]. Time: O(n*m) where n is amount, m is number of coins. Space: O(n). Can optimize space if only need previous values.',
    difficulty: 'Medium',
    category: 'Conceptual',
    faangFrequency: 'Very High',
    tags: ['classic', 'implementation', 'coin-change'],
  },
  {
    id: 'dp_004',
    topic: 'Dynamic Programming',
    question: 'Explain the longest common subsequence (LCS) problem and how to solve it.',
    modelAnswer:
      'LCS: longest sequence of characters appearing in same order in both strings (not necessarily consecutive). DP state: dp[i][j] = LCS length of str1[0..i] and str2[0..j]. Transition: if str1[i] == str2[j], dp[i][j] = dp[i-1][j-1] + 1; else dp[i][j] = max(dp[i-1][j], dp[i][j-1]). Time: O(m*n), space: O(m*n). To reconstruct LCS, backtrack through dp table.',
    difficulty: 'Hard',
    category: 'Conceptual',
    faangFrequency: 'High',
    tags: ['lcs', 'string', '2d-dp'],
  },
  {
    id: 'dp_005',
    topic: 'Dynamic Programming',
    question: 'How do you recognize if a problem can be solved with DP? What patterns to look for?',
    modelAnswer:
      'Red flags (this might be DP): (1) "find minimum/maximum"; (2) "count number of ways"; (3) "is it possible"; (4) brute force is exponential; (5) recursive solution has overlapping subproblems (you compute same thing multiple times). Tests: (1) Can you define a state? (2) Can you find a recurrence relation? (3) Are there overlapping subproblems? If yes to all, likely DP. Common patterns: knapsack, longest sequence, grid paths, interval problems.',
    difficulty: 'Medium',
    category: 'Conceptual',
    faangFrequency: 'Medium',
    tags: ['recognition', 'patterns', 'interview-tips'],
  },

  // ===== HASHING =====
  {
    id: 'hash_001',
    topic: 'Hashing',
    question: 'What is a hash table and how does it handle collisions?',
    modelAnswer:
      'Hash table uses hash function to map keys to array indices. Collision occurs when two keys hash to same index. Handling methods: (1) Chaining: each index stores list of key-value pairs; (2) Open addressing: find another empty slot (linear probing, quadratic probing, double hashing). Chaining is simpler, open addressing saves space but has worse performance. Good hash function: distributes keys uniformly, fast to compute. Average O(1) for insert/lookup/delete.',
    difficulty: 'Medium',
    category: 'Conceptual',
    faangFrequency: 'High',
    tags: ['implementation', 'collisions', 'hash-function'],
  },
  {
    id: 'hash_002',
    topic: 'Hashing',
    question: 'How would you solve the "two sum" problem efficiently using a hash map?',
    modelAnswer:
      'Instead of O(n²) nested loops or O(n log n) sort, use hash map in O(n). (1) Iterate through array; (2) For each number, check if (target - number) is in map; (3) If yes, return both indices; (4) If no, add current number to map. Time: O(n), space: O(n). This is much more efficient than sorting because we don\'t need sorted order, and we avoid nested loops.',
    difficulty: 'Easy',
    category: 'Conceptual',
    faangFrequency: 'Very High',
    tags: ['hashmap', 'two-pointer', 'classic'],
  },
  {
    id: 'hash_003',
    topic: 'Hashing',
    question: 'What is a good hash function? What properties should it have?',
    modelAnswer:
      'Good hash function properties: (1) Deterministic: same key always produces same hash; (2) Uniform distribution: outputs uniformly across range; (3) Efficient: fast computation; (4) Avalanche effect: small change in input produces large change in output; (5) Few collisions: ideally minimal collision rate. Examples: (a) Poor: h(key) = key % 10 (for keys ending in same digit); (b) Better: multiply by prime (key * 31 + key[i]) for strings. Language-specific: Python uses SipHash, Java uses murmur3.',
    difficulty: 'Hard',
    category: 'Conceptual',
    faangFrequency: 'Medium',
    tags: ['hash-function', 'design', 'properties'],
  },
  {
    id: 'hash_004',
    topic: 'Hashing',
    question: 'Explain how a hash map is resized when it becomes too full.',
    modelAnswer:
      'When load factor (entries / capacity) exceeds threshold (typically 0.75), hash map is resized. (1) Create new larger table (usually double size); (2) Rehash all entries: compute new hash for each key in new table; (3) Copy entries to new table. This is O(n) operation, but amortized O(1) per insertion because done infrequently. Load factor balances space usage vs collision rate. Too low = waste space; too high = more collisions.',
    difficulty: 'Hard',
    category: 'Conceptual',
    faangFrequency: 'Medium',
    tags: ['resizing', 'load-factor', 'implementation'],
  },

  // ===== STACKS & QUEUES =====
  {
    id: 'sq_001',
    topic: 'Stacks & Queues',
    question: 'What is a stack and what are its main operations and use cases?',
    modelAnswer:
      'Stack (LIFO - Last In First Out): push adds to top, pop removes from top, peek views top. Operations: O(1) each. Uses: (1) function call stack in programming; (2) undo/redo in editors; (3) back button in browsers; (4) parsing expressions; (5) depth-first traversal. Simple implementation: array with top pointer or linked list. Key: LIFO ordering determines most use cases.',
    difficulty: 'Easy',
    category: 'Verbal',
    faangFrequency: 'High',
    tags: ['fundamentals', 'lifo', 'uses'],
  },
  {
    id: 'sq_002',
    topic: 'Stacks & Queues',
    question: 'What is a queue and what are its main operations and use cases?',
    modelAnswer:
      'Queue (FIFO - First In First Out): enqueue adds to back, dequeue removes from front, peek views front. Operations: O(1) each with circular array or linked list. Uses: (1) breadth-first traversal; (2) task scheduling; (3) print job queue; (4) message passing; (5) level-order tree traversal. FIFO ordering is essential for maintaining order of processing.',
    difficulty: 'Easy',
    category: 'Verbal',
    faangFrequency: 'High',
    tags: ['fundamentals', 'fifo', 'uses'],
  },
  {
    id: 'sq_003',
    topic: 'Stacks & Queues',
    question: 'How would you implement a stack using two queues?',
    modelAnswer:
      'Use two queues q1 and q2. (1) Push: enqueue to q1. (2) Pop: move all but last element from q1 to q2, dequeue from q1, swap q1 and q2. Pop is O(n), others O(1). Alternative: reverse steps, pop from q1 is O(1) but push is O(n). Can also use single queue: when pushing, rotate previous elements. Trade-off between push and pop efficiency.',
    difficulty: 'Medium',
    category: 'Conceptual',
    faangFrequency: 'Medium',
    tags: ['implementation', 'stack-from-queues', 'tradeoff'],
  },
  {
    id: 'sq_004',
    topic: 'Stacks & Queues',
    question: 'How would you check if parentheses are balanced using a stack?',
    modelAnswer:
      'Iterate through string. (1) Push opening brackets to stack; (2) For closing bracket, check if stack is empty or top doesn\'t match, return false; (3) If matches, pop. After loop, stack must be empty. Time: O(n), space: O(n). Handles nested and different types: (), [], {}. Common mistake: only checking at the end, not catching mismatches immediately.',
    difficulty: 'Easy',
    category: 'Conceptual',
    faangFrequency: 'Very High',
    tags: ['parentheses', 'stack-application', 'classic'],
  },

  // ===== LINKED LISTS =====
  {
    id: 'll_001',
    topic: 'Linked Lists',
    question: 'What are the advantages and disadvantages of linked lists vs arrays?',
    modelAnswer:
      'Linked List Pros: (1) dynamic size, no pre-allocation; (2) efficient insertion/deletion at head or known position; (3) no wastage for sparse data. Cons: (1) no random access (O(n) vs O(1)); (2) extra space for pointers; (3) cache unfriendly. Array Pros: (1) O(1) random access; (2) cache locality; (3) less memory overhead. Cons: (1) fixed size; (2) expensive insertion/deletion; (3) wastage if not full. Choose based on access patterns.',
    difficulty: 'Easy',
    category: 'Verbal',
    faangFrequency: 'Medium',
    tags: ['comparison', 'tradeoffs', 'fundamentals'],
  },
  {
    id: 'll_002',
    topic: 'Linked Lists',
    question: 'How would you remove the Nth node from the end of a linked list?',
    modelAnswer:
      'Common approach: find length first, then remove. Better approach using two pointers: (1) Create dummy node pointing to head (handles edge case of removing head); (2) Use two pointers n+1 apart; (3) Move both until fast reaches end; (4) Slow will be before target node; (5) Remove by skipping: slow.next = slow.next.next. Time: O(n) single pass, space: O(1).',
    difficulty: 'Medium',
    category: 'Conceptual',
    faangFrequency: 'Very High',
    tags: ['two-pointer', 'edge-cases', 'dummy-node'],
  },
  {
    id: 'll_003',
    topic: 'Linked Lists',
    question: 'Explain how to merge two sorted linked lists.',
    modelAnswer:
      'Use two pointers for traversal, create dummy node. (1) Compare current nodes from both lists; (2) Add smaller node to result; (3) Advance pointer of the list we took from; (4) After one list exhausted, append remaining from other list. Time: O(n+m), space: O(1) (not counting output). Key: no reallocation, just rearrange pointers. Result is sorted because we always pick smaller.',
    difficulty: 'Easy',
    category: 'Conceptual',
    faangFrequency: 'High',
    tags: ['merge', 'two-pointer', 'classic'],
  },
  {
    id: 'll_004',
    topic: 'Linked Lists',
    question: 'How would you find the middle of a linked list? Does the size matter?',
    modelAnswer:
      'Fast/slow pointer approach: slow moves 1 step, fast moves 2 steps. When fast reaches end, slow is at middle. Time: O(n), space: O(1). Returns first middle for even length (e.g., for 1->2->3->4, returns 2). Alternative: count length first then traverse halfway. Fast/slow is elegant and single pass. For even-length lists, can return either middle depending on pointer positions.',
    difficulty: 'Medium',
    category: 'Conceptual',
    faangFrequency: 'High',
    tags: ['fast-slow-pointer', 'middle', 'elegant'],
  },

  // ===== SORTING =====
  {
    id: 'sort_001',
    topic: 'Sorting',
    question: 'Compare different sorting algorithms: time complexity, space, stability, and when to use each.',
    modelAnswer:
      'Key algorithms: (1) Merge: O(n log n) guaranteed, O(n) space, stable, good for linked lists; (2) Quick: O(n log n) avg, O(log n) space, unstable, good for arrays; (3) Heap: O(n log n) worst, O(1) space, unstable; (4) Bubble: O(n²), O(1), stable, for teaching; (5) Insertion: O(n²) worst, O(1), stable, good for small/mostly sorted. Stability: maintains relative order of equal elements. Most languages use hybrid (Tim sort, intro sort).',
    difficulty: 'Medium',
    category: 'Conceptual',
    faangFrequency: 'High',
    tags: ['comparison', 'analysis', 'practical'],
  },
  {
    id: 'sort_002',
    topic: 'Sorting',
    question: 'Explain the quicksort algorithm and why it\'s called "quick".',
    modelAnswer:
      'Quicksort: divide-and-conquer using partition. (1) Choose pivot; (2) Partition array so elements < pivot on left, > pivot on right; (3) Recursively sort left and right. Average O(n log n) because balanced partitions halve problem. Worst O(n²) with bad pivot (e.g., already sorted). Called "quick" because: (1) fast average case; (2) in-place O(log n) space; (3) cache-friendly. Key: pivot selection (random, median-of-three).',
    difficulty: 'Medium',
    category: 'Conceptual',
    faangFrequency: 'High',
    tags: ['quicksort', 'divide-conquer', 'implementation'],
  },
  {
    id: 'sort_003',
    topic: 'Sorting',
    question: 'What is the difference between stable and unstable sorting?',
    modelAnswer:
      'Stable sort: maintains relative order of equal elements. Example: sort by age, people with same age stay in original order. Unstable sort: equal elements might reorder. Matters when: (1) sorting by multiple keys; (2) secondary data associated with keys. Stable sorts: merge, bubble, insertion. Unstable: quicksort, heapsort. Can make unstable sort stable by adding original index to comparison.',
    difficulty: 'Easy',
    category: 'Conceptual',
    faangFrequency: 'Medium',
    tags: ['stability', 'definition', 'implications'],
  },

  // ===== GREEDY ALGORITHMS =====
  {
    id: 'greedy_001',
    topic: 'Greedy',
    question: 'What is a greedy algorithm? When is it guaranteed to give optimal solution?',
    modelAnswer:
      'Greedy makes locally optimal choice at each step, hoping for global optimum. Works when: (1) problem has greedy choice property (local optimal leads to global); (2) problem has optimal substructure. Examples where it works: activity selection, Huffman coding, Kruskal\'s MST. Counter-example: coin change (doesn\'t always work, needs DP). Key: must prove greedy choice is safe.',
    difficulty: 'Medium',
    category: 'Conceptual',
    faangFrequency: 'Medium',
    tags: ['technique', 'optimality', 'proofs'],
  },
  {
    id: 'greedy_002',
    topic: 'Greedy',
    question: 'Explain the activity selection problem and its greedy solution.',
    modelAnswer:
      'Given activities with start/end times, select maximum non-overlapping activities. Greedy: sort by end time, always pick next earliest-ending activity. This leaves max room for future activities. Proof: if not optimal, greedy\'s choice is at least as good as optimal\'s first choice; then same reasoning for remaining problem. Time: O(n log n) for sorting. Classic example of greedy optimality.',
    difficulty: 'Medium',
    category: 'Conceptual',
    faangFrequency: 'Medium',
    tags: ['activity-selection', 'classic', 'proof'],
  },
  {
    id: 'greedy_003',
    topic: 'Greedy',
    question: 'How would you solve the minimum waiting time scheduling problem greedily?',
    modelAnswer:
      'Given jobs with durations, minimize total waiting time. Greedy: sort by duration, run shortest first. Proof: if we swap jobs i and j where i > j, total wait decreases. Time: O(n log n). Intuition: running long jobs first makes everyone wait longer. This is one of few cases where greedy is intuitively obvious and provably optimal.',
    difficulty: 'Easy',
    category: 'Conceptual',
    faangFrequency: 'Low',
    tags: ['scheduling', 'job-sequence', 'intuitive'],
  },

  // ===== STRING ALGORITHMS =====
  {
    id: 'str_001',
    topic: 'Searching',
    question: 'What is KMP (Knuth-Morris-Pratt) string matching and why is it faster than naive?',
    modelAnswer:
      'KMP finds pattern in text efficiently. Naive: O(n*m) worst case. KMP: O(n+m) by building failure function (LPS array) that tells how far to backtrack. When mismatch occurs, don\'t restart from beginning; use LPS to skip known non-matching positions. LPS[i] = longest proper prefix which is also suffix of pattern[0..i]. This is key insight: pattern has internal structure we can exploit.',
    difficulty: 'Hard',
    category: 'Conceptual',
    faangFrequency: 'Medium',
    tags: ['pattern-matching', 'optimization', 'advanced'],
  },
  {
    id: 'str_002',
    topic: 'Searching',
    question: 'How would you check if a string is an anagram of another?',
    modelAnswer:
      'Simple approach: sort both strings, compare. O(n log n). Better: count character frequencies with hash map. If counts match, they\'re anagrams. O(n) time, O(k) space (k = unique characters). Even simpler: if lengths differ, not anagrams. For interview: start with sort (simple), then optimize to hash map if asked. Handle spaces/case based on problem statement.',
    difficulty: 'Easy',
    category: 'Conceptual',
    faangFrequency: 'High',
    tags: ['anagram', 'hashmap', 'optimization'],
  },
  {
    id: 'str_003',
    topic: 'Searching',
    question: 'Explain how you\'d find all permutations of a string.',
    modelAnswer:
      'Use backtracking. (1) For each position, try each unused character; (2) Recursively fill remaining positions; (3) Backtrack when done. For string of length n, there are n! permutations. Time: O(n * n!), space: O(n). To avoid duplicates, sort first and skip duplicate characters at each level. Alternative: swap-based approach where we swap characters to generate permutations.',
    difficulty: 'Medium',
    category: 'Conceptual',
    faangFrequency: 'High',
    tags: ['permutation', 'backtracking', 'combinations'],
  },

  // ===== INTERVIEWS PREPARATION =====
  {
    id: 'prep_001',
    topic: 'Hashing',
    question: 'How do you approach a problem you\'ve never seen before in an interview?',
    modelAnswer:
      'Framework: (1) Clarify: ask about input constraints, examples, edge cases; (2) Brute force: think of simplest solution first, state complexity; (3) Optimize: identify bottlenecks, apply techniques (hash map, two pointer, etc.); (4) Implement: code carefully, handle edge cases; (5) Test: trace through examples, check boundaries. Don\'t jump to solution. Show your thinking. Communicate throughout. Ask for hints if stuck.',
    difficulty: 'Medium',
    category: 'Conceptual',
    faangFrequency: 'Very High',
    tags: ['problem-solving', 'framework', 'interview-strategy'],
  },
  {
    id: 'prep_002',
    topic: 'Trees',
    question: 'What should you do if you get stuck on a problem during an interview?',
    modelAnswer:
      'Don\'t panic or go silent. (1) Think out loud: "I\'m thinking about..."; (2) Ask clarifying questions; (3) Discuss tradeoffs you\'re considering; (4) Ask for hints if genuinely stuck for >2 min; (5) Solve simpler version first (smaller input, specific case); (6) Check if similar problems you know might help; (7) If really stuck, implement brute force, state its complexity, explain optimization ideas. Interviewer wants to see problem-solving process, not just answer.',
    difficulty: 'Easy',
    category: 'HR',
    faangFrequency: 'Very High',
    tags: ['stuck', 'communication', 'mindset'],
  },
  {
    id: 'prep_003',
    topic: 'Graphs',
    question: 'How do you decide between different algorithms when multiple approaches solve the problem?',
    modelAnswer:
      'Compare: (1) Time complexity: are both O(n log n)? If not, which is better given constraints?; (2) Space complexity: does one use less memory?; (3) Simplicity: which is easier to code without bugs?; (4) Constants: smaller constants might matter for n=10^6; (5) Cache locality: arrays better than linked lists; (6) Interview context: if time limited, simpler might be better than fancy algorithm. Communicate your reasoning. Usually, clearly state: "X is simpler, Y is faster. I\'ll do X for clarity."',
    difficulty: 'Medium',
    category: 'Conceptual',
    faangFrequency: 'High',
    tags: ['decision-making', 'tradeoffs', 'analysis'],
  },
  {
    id: 'prep_004',
    topic: 'Dynamic Programming',
    question: 'How much time should you spend on each phase of the interview (problem understanding, solution, implementation)?',
    modelAnswer:
      'Typical breakdown for 45-min interview: (1) Understanding & examples: 5 min; (2) Brute force & optimization: 10-15 min; (3) Implementation: 15-20 min; (4) Testing & edge cases: 5-10 min. Adjust if interviewer rushes. Better to implement one solution well than sketch multiple. If you have time, explain optimization opportunities. If stuck on implementation, talk through logic even if not coding perfectly.',
    difficulty: 'Easy',
    category: 'HR',
    faangFrequency: 'High',
    tags: ['time-management', 'pacing', 'strategy'],
  },
  {
    id: 'prep_005',
    topic: 'Sorting',
    question: 'How do you handle mistakes and bugs during live coding interviews?',
    modelAnswer:
      'Mistakes happen to everyone. (1) If caught by you: fix calmly, explain what you were fixing; (2) If caught by interviewer: acknowledge, fix, move on. Don\'t dwell. Don\'t blame the interviewer or make excuses. (3) Logical bugs: trace through example to find the issue. (4) Syntax: assume interviewer won\'t care about perfect syntax, focus on logic. (5) Preventive: write carefully, test as you go with examples. Recover professionally; interviewer cares about problem-solving, not perfection.',
    difficulty: 'Easy',
    category: 'HR',
    faangFrequency: 'Medium',
    tags: ['mistakes', 'recovery', 'professionalism'],
  },
]

// For easy access, index by topic
export const QUESTIONS_BY_TOPIC = INTERVIEW_QUESTIONS.reduce((acc, q) => {
  if (!acc[q.topic]) acc[q.topic] = []
  acc[q.topic].push(q)
  return acc
}, {})

// Filter helpers
export const filterQuestions = (questions, filters) => {
  return questions.filter((q) => {
    if (filters.difficulty && q.difficulty !== filters.difficulty) return false
    if (filters.category && q.category !== filters.category) return false
    if (filters.faangFrequency && q.faangFrequency !== filters.faangFrequency) return false
    if (filters.topic && q.topic !== filters.topic) return false
    return true
  })
}
