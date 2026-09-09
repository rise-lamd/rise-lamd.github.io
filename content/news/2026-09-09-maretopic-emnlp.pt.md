---
title: "MARETopic é aceito na conferência principal do EMNLP 2026"
date: 2026-09-09
summary: "O artigo 'A Manifold-Aware Topic Modeling Approach via Rank-Based Prototypes', que propõe o modelo MARETopic, foi aceito na prestigiada conferência EMNLP 2026."
---

O laboratório **RISE-LAMD** celebra a aceitação do artigo **"A Manifold-Aware Topic Modeling Approach via Rank-Based Prototypes"** na trilha principal (*Main Conference*) do **EMNLP 2026** (*Conference on Empirical Methods in Natural Language Processing*), uma das conferências internacionais mais prestigiadas e de maior impacto no mundo nas áreas de Inteligência Artificial e Processamento de Linguagem Natural (Qualis A1 / CORE A*).

O trabalho é de autoria de **Thiago César Castilho Almeida** e do **Prof. Dr. Daniel Carlos Guimarães Pedronette**.

---

### O que é o MARETopic?

Enquanto a maioria dos modelos de tópicos neurais tradicionais produz tópicos como distribuições abstratas sobre o vocabulário ou vetores latentes sem correspondência direta com textos do mundo real, o **MARETopic** (**M**anifold-**A**ware and **R**ank-based **E**xemplars Topic Modeling) adota um princípio fundamental: **o documento é o tópico**.

Um algoritmo guloso (*greedy leader selection*) seleciona exatamente $K$ documentos representativos ("líderes") cujas vizinhanças cobrem o corpus textual. Como cada líder é um documento real do conjunto de dados, o usuário pode abri-lo e lê-lo na íntegra, conferindo interpretabilidade direta e intuitiva por construção.

![Pipeline do MARETopic: do corpus textual aos K tópicos via Sentence-BERT, variedade UMAP, listas ranqueadas, seleção gulosa de líderes e C-TF-IDF + MMR.](/img/publications/maretopic/maretopic-pipeline.png)

---

### Principais Destaques e Contribuições

- **Livre de Treinamento (*Training-Free*)**: Não requer retropropagação de gradientes, parametrizações complexas ou inferência variacional, reduzindo drasticamente a pegada computacional.
- **Número Exato de $K$ Tópicos**: O parâmetro $K$ é respeitado deterministicamente na seleção, sem depender de ajustes de densidade pós-execução.
- **Robustez com Rankings e Variedades**: Ao codificar documentos com S-BERT, projetá-los em uma variedade de baixa dimensão (UMAP) e convertê-los em listas ranqueadas ordinais, o método mitiga os efeitos prejudiciais de *hubness* e anisotropia típicos de espaços vetoriais densos.
- **Palavras-chave Diversificadas via C-TF-IDF + MMR**: Utiliza *Maximal Marginal Relevance* (MMR) inter-tópicos para penalizar ativamente a sobreposição de vocabulário entre tópicos distintos, maximizando a diversidade sem comprometer a coerência.
- **Inferência Fora da Amostra (*Out-of-sample*)**: Documentos novos podem ser projetados e pontuados em relação aos líderes descobertos sem necessidade de reajuste (*refitting*) de todo o modelo.
- **Duas Variantes**:
  - **`MARETopic_Corr`**: Pontua candidatos por meio de um preditor de desempenho de consulta (*Reciprocal Density*) e penaliza redundâncias por sobreposição de ranking (*JaccardMax*), integrando a biblioteca [GRaCE](https://github.com/thcastilho/interpretable-embeddings).
  - **`MARETopic_Diff`**: Utiliza difusão sobre matriz de afinidade ranqueada ($W^2$), dispensando medidas manuais de correlação e proporcionando execução ainda mais rápida.
- **Integração Nativa com o TopMost**: Compatibilidade direta com o ecossistema de avaliação [TopMost](https://github.com/BobXWu/TopMost) para métricas de coerência, diversidade e agrupamento.

---

### Código Aberto e Disponibilidade

O pacote oficial já se encontra disponível para instalação via pip:

```bash
pip install maretopic
```

Para detalhes de uso, documentação completa e exemplos com conjuntos de referência (como o 20 Newsgroups), acesse o repositório oficial no GitHub:
- **Repositório GitHub:** [https://github.com/thcastilho/maretopic](https://github.com/thcastilho/maretopic)
- **Publicações do RISE-LAMD:** Consulte nossa seção de [Publicações](/pt/publications/) para mais artigos do grupo.
