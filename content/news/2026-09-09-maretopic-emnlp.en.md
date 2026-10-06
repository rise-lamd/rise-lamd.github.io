---
title: "MARETopic Accepted at EMNLP 2026 Main Conference"
date: 2026-09-09
summary: "The paper 'A Manifold-Aware Topic Modeling Approach via Rank-Based Prototypes', introducing the MARETopic framework, has been accepted at the prestigious EMNLP 2026 conference."
---

The **RISE-LAMD** laboratory is pleased to celebrate the acceptance of the paper **"A Manifold-Aware Topic Modeling Approach via Rank-Based Prototypes"** into the Main Conference of **EMNLP 2026** (*Conference on Empirical Methods in Natural Language Processing*), one of the world's flagship conferences in Artificial Intelligence and Natural Language Processing (Qualis A1 / CORE A*).

The paper is authored by **Thiago César Castilho Almeida** and **Prof. Dr. Daniel Carlos Guimarães Pedronette**.

---

### What is MARETopic?

While most neural topic models produce topics as abstract latent vectors or distributions over vocabulary with no direct grounding in any real text, **MARETopic** (**M**anifold-**A**ware and **R**ank-based **E**xemplars Topic Modeling) establishes a direct, grounded principle: **the document is the topic**.

A greedy algorithm (*greedy leader selection*) selects exactly $K$ representative documents ("leaders") whose neighborhoods cover the corpus. Because each leader is a genuine text from the dataset, users can open and read it in its entirety, providing direct, intuitive interpretability by construction.

![MARETopic pipeline: from text corpus to K topics via Sentence-BERT, UMAP manifold, ranked lists, greedy leader selection, and C-TF-IDF + MMR.](/img/publications/maretopic/maretopic-pipeline.png)

---

### Key Highlights and Contributions

- **Training-Free**: Requires no gradient descent, no backpropagation, and no heavy variational inference, dramatically slashing the computational footprint.
- **Exact Number of $K$ Topics**: The topic count $K$ is treated as a deterministic input constraint rather than an uncertain byproduct of post-clustering density thresholds.
- **Robustness via Ranks and Manifolds**: By encoding documents with S-BERT, projecting them onto a low-dimensional manifold (UMAP), and converting them into ordinal ranked lists, the model bypasses the hubness and anisotropy problems prevalent in dense high-dimensional embeddings.
- **Diverse Keywords via c-TF-IDF + MMR**: Uses inter-topic Maximal Marginal Relevance (MMR) to actively penalize vocabulary overlap across distinct topics, maximizing topic diversity while preserving semantic coherence.
- **Out-of-Sample Inference**: Unseen test documents can be projected and scored against existing leader prototypes without refitting the model.
- **Two Specialized Variants**:
  - **`MARETopic_Corr`**: Scores candidate documents with a query performance predictor (*Reciprocal Density*) and penalizes redundancy via prefix rank overlap (*JaccardMax*), powered by the [GRaCE](https://github.com/thcastilho/interpretable-embeddings) library.
  - **`MARETopic_Diff`**: Operates on a rank-weighted affinity matrix with diffusion powers ($W^2$), removing the need for manual correlation scoring and accelerating throughput.
- **Native TopMost Integration**: Fully compliant out of the box with the [TopMost](https://github.com/BobXWu/TopMost) evaluation suite for benchmarking topic coherence, diversity, and clustering accuracy.

---

### Open Source and Availability

The official Python package is published and available via pip:

```bash
pip install maretopic
```

For complete documentation, quickstart tutorials, and benchmarks on standard datasets (such as 20 Newsgroups), check out the GitHub repository:
- **GitHub Repository:** [https://github.com/thcastilho/maretopic](https://github.com/thcastilho/maretopic)
- **arXiv Preprint:** [https://arxiv.org/abs/2609.29630](https://arxiv.org/abs/2609.29630)
- **RISE-LAMD Publications:** Visit our [Publications](/publications/) page to explore our latest research papers.
