# NLP平台

> NLP平台进行文本分析的组件如下：分词、词性标注、命名实体识别、依存句法分析、文本分类、情感分析、摘要提取、关键词提取和语义联想，共9大组件。

# 功能

在具体实现中，包括如下功能：
- basicanalysis：包括文本的分词、词性标注、命名实体识别和依存句法分析。
- textclass：文本分类，分析文本所属的二级类别。（category）
- keywords：关键词提取，提取出文本中的关键词，并计算关键词权重。(key)
- sentiment：情感分析，分析文本的情感，正面、负面或中性，并计算情感指数。(sentiment?analysisType=)
- summary：摘要提取，提取出文本中的摘要。(summary)
- association：语义联想，根据关键词，计算每个关键词联想的7个词，以及词的得分。(suggest)
- all：以上所有结果合并（注意：会分别执行所有步骤，速度最慢，不建议使用）

# Resources
https://bosonnlp.com/demo

# 预览
https://agitated-dubinsky-67c1f7.netlify.com/demo.html
