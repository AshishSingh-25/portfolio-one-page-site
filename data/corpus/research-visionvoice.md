---
source: research-visionvoice
title: VisionVoice research paper (Paper 119)
original_file: "Paper #119.pdf"
original_sha256: bd4ae4727f6a98f6a3f28f5b65b81e0fdbf3bb443e3d73c1a54fc59d7fed7eb2
pages: 9
---

# VisionVoice research paper

Page-numbered text from the supplied nine-page manuscript. Author email addresses are omitted. Figure descriptions are marked as visual transcription notes. Publication metadata is separately supplied in the CV; this manuscript does not assign individual author contributions.

## VisionVoice manuscript - page 1

VisionVoice: An Image Captioning Web Application that

Converts it to Audio for the Visually Impaired

Ashish Singh1, a) and Daksh Sati1, b) and Deepak Singh1, c) and Hrishi1, d) and Dr.

Neha Tyagi2, e)

Visual transcription note for page 1: Ashish Singh is marked as the corresponding author by superscript a and its footnote. Author email addresses are omitted from this searchable copy.

1B.Tech(CSE), Amity University, Noida 201301, India 2Associate Professor, Amity University, Noida 201301, India

Abstract. In an era dominated by visual content, the "VisionVoice" project emerges as a pioneering web application committed to narrowing the accessibility gap for visually impaired individuals. VisionVoice leverages cutting-edge machine learning technologies to deliver an immersive and inclusive experience for visually impaired users when engaging with visual information, such as picture slideshows and presentations. By employing advanced algorithms, VisionVoice transforms static images into dynamic, audio-narrated videos, enabling visually impaired individuals to access, comprehend, and interact with visual content on par with their sighted peers. This research paper explores the innovative methodologies, technical intricacies, and real-world impact of VisionVoice, emphasizing its pivotal role in advancing inclusivity and accessibility in the digital age.

INRODUCTION

Object detection performs a critical role in the realm of computer vision, autonomous vehicles, industrial automation, and numerous other applications. The continuous and real-time recognition of objects still remains as a formidable challenge in these domains. While traditional object detection methods have been employed, the dawn of deep learning has ushered in a new era of improved accuracy and efficiency in this field. Deep learning techniques, particularly those employing region proposal object detection algorithms, have gained prominence. These methods encompass various approaches such as SPPnet, region-based convolutional neural networks, Fast RCNN, Faster RCNN, among others.

This paper introduces a robust methodology for text extraction from images and its subsequent conversion into speech. While previous research has explored diverse strategies for text recognition and extraction, our study, titled "VisionVoice: An image captioning web application that converts it to audio for the visually impaired," concentrates on the utilization of image processing techniques for text extraction. The image processing pipeline encompasses essential stages such as pre-processing, segmentation, classification, and post-processing.

In the pursuit of developing a fully automated conversion algorithm, the challenge of image segmentation emerges as a critical component. This process is inherently complex, often requiring manual intervention to achieve optimal results. Segmentation serves two fundamental objectives: first, to partition the image into discernible components for subsequent analysis, and second, to reorganize pixel-level information into higher-level units, enhancing the interpretability of objects within the image.

• Data collection and Pre-Processing: This initial phase typically involves cleaning and enhancing the input image to improve its suitability for subsequent analysis. Pre-processing steps might include noise reduction, resizing, contrast adjustment, and color normalization. • Feature Extraction: Feature extraction aims to identify and quantify relevant characteristics or patterns within the pre-processed image. • Image Segmentation: Image segmentation involves dividing the image into distinct regions or objects based on the extracted features or other criteria. The goal is to isolate regions that contain text or relevant content.

## VisionVoice manuscript - page 2

• Model Architecture: Establish an encoder-decoder architecture for the purpose of captioning images. • Text-to-Speech Synthesis: The final phase focuses on converting the recognized text into natural-sounding speech. Text-to-speech (TTS) synthesis techniques are used to generate audio output that conveys the content of the image in a way that's accessible to the visually impaired.

Image Segmentation: A Crucial Component of Image Captioning

Using specific criteria, an image is divided into meaningful and coherent parts or segments as part of the core task of image segmentation in computer vision. The objective is to divide an image into different zones that match the image's objects, borders, or interesting areas. In many different applications, such as object detection, image recognition, medical image analysis, and autonomous driving, picture segmentation is essential. Following are some crucial elements of picture segmentation:

• Thresholding: Setting a threshold value for pixel intensity is a straightforward segmentation approach. One section is designated by pixels with intensity values above the threshold, while another is designated by pixels with intensity values below the threshold. • Region-based Segmentation: This method divides pixels into areas based on how similar their colors, textures, or other characteristics are to one another. Algorithms for clustering data, such as k-means or mean-shift, are frequently used.

Text to Speech Model

Despite decades of research, creating human sounding speech from the very text (text-to-speech synthesis, TTS) is still a difficult task. Different me,thods have come to dominate the field throughout time. Concatenative synthesis, or the sewing together of small units of previously recorded waveforms , has been best in the business for long time now.

WaveNet, a generative model of time domain waveforms, has already been used in certain full-fledged TTS systems and provides audio quality that starts to approach that of a human.

The standard speech synthesis process is made simpler by Tacotron, a sequence focused architecture for generating scale spectrograms from a arrangement of characters.

LITERATURE REVIEW

Researchers in the field of computer vision and natural language processing have developed two innovative deep learning models to tackle the challenging task of image captioning. These models, which seamlessly integrate convolutional neural networks (CNNs) and recurrent neural networks (RNNs), as well as cascading CNN architectures, have demonstrated impressive results in generating descriptive captions for images presented by Liu, Shuang, Bai, Liang, Hu, Yanli, and Wang, Haoran et al. [1]. Convolutional neural networks are used for encoding in a CNN-RNN framework, and recurrent neural networks are used for decoding. The images in this case are transformed into vectors using CNN, and these vectors—which are referred to as image features—are then fed as input into recurrent neural networks.

The CNN-CNN Model requires less training time than the CNN-RNN Model. As it is sequential, the CNN-RNN Model requires more training time but has lower loss than the CNN-CNN Model.[2]

They have employed an encoding decoding model for image captioning in the way put forward by Ansari Hani et al. [2].

When dealing with a newer location, correlations are calculated for both, the captions and the test images as well, and depending on that the caption with the highest correlation value is retrieved as the caption for the given image from the provided set of captions dictionary. In this study, they use a technique called prototype-based description.

The strategy put out by Subrata Das, Lalit Jain, and colleagues is based mostly on deep learning models and their application for captioning military images. It mostly makes use of a CNNRNN-based framework. The authors combine Long Short-Term Memory (LSTM) networks with the Inception model to overcome issues with gradient descent during image encoding. An RNN variant called LSTM is effective in detecting long-distance dependencies in sequential data. By keeping track of the words generated so far, LSTM helps in this scenario to generate captions that are cohesive and contextually relevant.

## VisionVoice manuscript - page 3

1. Image Encoding (CNN): A CNN (typically pre-trained on huge datasets) processes the input image to extract

pertinent visual information. These characteristics are shown as a fixed-length vector.[3] 2. Caption Generation (LSTM): An LSTM-based language model receives the encoded picture features as its

initial input. Word by word, the LSTM network creates the caption, gradually adding context and details from the image attributes.[3]

Significant Distinctions between RNN and CNN Architectures

The significant distinction among these is the capacity to identify temporary information—data that occurs in sequences—distinguishes a CNN from an RNN. Convolutional neural networks are unable to successfully comprehend temporal information, whereas the RNN are created specifically for this reason. As a result, CNNs and RNNs are employed for very different objectives, necessitating variations in the neural network structures themselves. The following are some key distinctions between RNNs and CNNs:

Data type and structure:

1. RNNs: For sequential data, where the sequence of the items is important, RNNs were developed. They are

frequently employed for jobs involving speech recognition, time series data, and natural language text. 2. CNNs: CNNs are made for data that can be organized into grids, like 2D or image grids. They are perfect for

jobs requiring the extraction of spatial features, like image categorization and object detection.

Architecture:

1. RNNs: Because RNNs feature recurrent connections, data can pass from one time step to the next. They can

thus be used to model the sequential dependencies in data. 2. CNNs: CNNs are made up of convolutional layers that apply filters to specific local areas of the input data,

enabling them to recognize hierarchical features throughout the input grid.

Memory and Context:

1. RNNs: Since RNNs can keep track of previous time steps, they are appropriate for jobs requiring context and

memory, such language modelling and speech recognition. 2. CNNs: CNNs are primarily concerned with identifying local patterns and characteristics within the data and

often lack built-in memory for sequential data.

Vocoder

A Text-to-Speech (TTS) system's essential component, the vocoder, or "voice encoder," transforms spectral representations of speech, like mel-spectrograms, into audio waveforms with a lifelike sound. Between the symbolic representation of speech and the audible output, it fills the gap. The vocoder creates an analogue audio signal that may be heard through speakers or headphones by taking as input a spectrogram that records the spectral information of speech over time.[5]

SHORTCOMINGS OF VARIOUS MODELS

There are many flaws in the current paradigm, as we have shown in the literature review. Each existing model has a drawback that reduces the model's effectiveness and accuracy when results are generated. The following are the flaws in all the models that have been observed:

CNN-CNN Model

There are many drawbacks to using the CNN-CNN architecture to an image captioning project.

## VisionVoice manuscript - page 4

• Redundant Feature Extraction: Redundant feature extraction would result from using two CNNs back-to- back. The first CNN would take picture features out, and the second CNN would effectively take those same elements out again. This redundant information adds to computational complexity without adding valuable data.[7] • Higher Cost of Computing: Comparing the sequential running of two CNNs to the usual CNN-RNN technique, the sequential running of two CNNs uses a significant amount more computing power.

CNN-RNN Model

A popular design for picture captioning is the CNN-RNN (Convolutional Neural Network - Recurrent Neural Network) model, but it has significant limitations and difficulties[7].

• Lack of Deep comprehension of Content, Context, and Semantics: CNNs are very good at extracting visual information from images, but they have limited contextual comprehension. Low-level and mid-level features are captured, but high-level semantic understanding—which is necessary for producing contextually pertinent captions—might be difficult for them to grasp. • Fixed-Length Feature Maps: Regardless of the complexity or substance of the image, CNNs generate fixed- length feature maps. When encoding images with various levels of detail, this might lead to an information loss.

CNN-LTSM Model

Although using a CNN-LSTM model for picture captioning provides benefits, there are some downsides as well. • Complexity: Due to the mix of convolutional and recurrent layers, CNN-LSTM models can be computationally expensive and demand large resources for training and inference. • Fixed-Length Captions: CNN-LSTM models frequently produce fixed-length captions, which may restrict their capacity to adjust to images with various degrees of complexity or substance.

AlexNet-LSTM Model

For the purpose of captioning images, AlexNet and an LSTM (Long Short-Term Memory) model are combined. This is done by building an architecture in which the LSTM acts as the caption decoder and AlexNet as the image encoder. It has a number of benefits but also some disadvantages.

• Depth Limitation: Compared to more recent designs AlexNet is rather shallow despite being deep when it was first introduced.

TABLE 1. Shortcomings of Various Models Serial Number Model Name Main Drawback 1 CNN-CNN Lack of sequential context; inability to capture fine-grained

temporal dependencies in

captions. 2 CNN-RNN Difficulty in capturing complex

visual features effectively. 3 CNN-LSTM Computational complexity due

to deep AlexNet architecture;

resource-intensive training.

## VisionVoice manuscript - page 5

PROPOSED MODEL

When selecting a model, it's critical to consider the unique elements of your dataset, the nature of the photos, and your computational capabilities. To cut down on training time and resource needs, consider the availability of pretrained models and whether transfer learning can be used to your work.

Due to its capacity to successfully capture both sequential context and sophisticated visual elements at the same time, the AlexNet-LSTM model provides a clear advantage over existing picture captioning designs. As a deep convolutional neural network, AlexNet excels in extracting detailed, hierarchical visual features that allow it to recognize minute details in images. Good results in problems involving picture categorization. Comparatively straightforward design in contrast to later variants. Efficient regularisation with the use of dropout and data augmentation.

Data Set Collection

When it comes to using the FLICKR 8K dataset to train deep learning models for creating image captions, it stands out as an invaluable tool. This dataset offers a balanced distribution with 8,000 photos altogether, 6,000 images for training the model, another 1,000 images for developmental purposes, and finally another 1,000 images for thorough testing of the model's capabilities. The FLICKR 8K dataset has five descriptive captions for each image, explaining the events and objects shown within. This is one of its distinguishing features. By adding thorough textual context to the visual data, this rich annotation improves the training.[8]

FIGURE 1. Single Class Data Set: Kitchen Class

Mathematics Involved

Using the FLICKR 8K dataset and the AlexNet-LSTM model, image captioning uses a number of mathematical ideas, terminology, and calculations. The following essential components are frequently employed when creating image captions:

• (Objective Function) Loss Function: Cross-Entropy Loss (Log-Likelihood Loss) is a widely adopted loss function implemented to quantify how different predicted captions are from the actual captions. It measures the discrepancy between the actual words in the captions and the expected word probabilities.

Cross-Entropy Loss = ∑𝑦𝑖 log (ŷ𝑖 𝑖 )

Visual transcription note for Figure 1: the kitchen-class illustration contains object labels and example images; the adjacent dataset paragraph names Flickr8K. The figure alone does not establish a separate dataset size.

## VisionVoice manuscript - page 6

• Gradient Descent: Gradient descent is used to update the model's parameters (weights and biases) during training. Calculus's chain rule is utilised in backpropagation to calculate the gradients. • LSTM-based recurrent neural networks: To regulate the information flow inside the network across successive time steps, LSTM units are defined by a collection of mathematical operations, such as forget gates, input gates, and output gates.

Image Preprocessing

Particularly for computer vision problems, image preprocessing is a common step in machine learning and deep learning applications. It entails converting the raw photos into a format that the model can accept. Some of the image preprocessing techniques are:

• Resizing: As it was created for the ImageNet competition, AlexNet normally requires input photos to have a resolution of 224 x 224 pixels. As a result, before sending your photos over the network, you must downsize them to this precise size. • Normalization: To place the image's pixel values inside a standardised range, normalise them. This usually entails dividing by the standard deviation after subtracting the mean. Depending on the ImageNet dataset or the dataset you are working with, the mean and standard deviation values used for normalisation may already be calculated.

Vocabulary Development

Because text is made up of symbols like letters and words that have various meanings and laws, neural networks cannot analyze text directly. Because they are straightforward and universal, only numbers can be processed by neural networks.[8] Therefore, we need to figure out how to convert text into numbers that can accurately convey the text's meaning and organizational structure.

A list of words and their accompanying numbers make up a vocabulary. We must search through each caption in the training data set, which contains the examples we need to instruct the neural network, in order to build a vocabulary. In order to properly number each word in the captions, we must first identify all the unique terms there are. The vocabulary could look something like this: "the cat is on the table" and "the dog is under the chair," for instance, assuming we had two captions.

AlexNet- The Encoder

Using deep neural networks, such as AlexNet. In 2012, a groundbreaking neural network architecture called AlexNet was introduced by a team of researchers, including Alex Krizhevsky, Ilya Sutskever, and the renowned Geoffrey Hinton. It rose to attention thanks to its exceptional performance. Its use and benefits are significant when it comes to computer vision tasks, especially picture categorization. The AlexNet convolutional layers process the input image. Convolutional filters are applied by these layers during feature extraction in order to identify hierarchical features in the image. Typically, max-pooling layers and activation functions (like ReLU) come after the convolutional layers.

FIGURE 2. AlexNet Architecture

## VisionVoice manuscript - page 7

’ FIGURE 3. Accuracy and Loss on a Selected Data Set

LSTM- The Decoder

The prime instance of a neural network that can learn from data sequences and generate data sequences of output is the LSTM.

Long Short-Term Memory Networks are utilized in order to create captions that are utilizing the output of AlexNet (Image feature vector) and vocabulary created using the data set in training. This means that we provide the LSTM with two different types of input: the first is the image feature vector, which is a list of numbers that describes the characteristics of the input image, such as its form, color, texture, etc.

FIGURE 4. LSTM General Architecture

Tacotron 2: A Model for TTS

Using a neural network design, Tacotron 2 produces speech solely from the plain and raw text. The system is composed of two parts: a recurrent sequence-to-sequence feature prediction network that converts character embeddings into mel-scale spectrograms, and a modified WaveNet model that functions as a vocoder to create time- domain waveforms from those provided spectrograms [9].

FIGURE 5. Tacotron 2 System Architecture

Visual transcription note for Figure 3: the plots are labelled Accuracy on CV data and Loss on CV data. Accuracy rises and loss falls across the plotted positions. The figure does not supply a tabulated exact final test score or a BLEU, METEOR, or CIDEr result. Do not treat a visual estimate as an exact benchmark. Figures 4 and 5 illustrate an LSTM cell and the Tacotron 2 speech pipeline.

## VisionVoice manuscript - page 8

The front-end of a TTS system, Tacotron 2 is in charge of handling the language portion of the synthesis process. It receives text input and creates a mel-spectrogram, which illustrates the spectral envelope of the speech over time. [6].

• Text Encoding: Recurrent neural networks (RNNs), typically Long Short-Term Memory (LSTM) or Gated Recurrent Units (GRUs), are used to process and encode the input text first. The linguistic information from the text is captured by this encoding. • Attention Mechanism: Tacotron 2's attention mechanism lines up the encoded text with the frames of the mel-spectrogram that are being produced. This alignment aids the model's ability to concentrate during synthesis on the crucial components of the input.

WaveNet: The Vocoder for TTS Model

Tacotron 2 can generate the mel-spectrogram, which can then be sent into a vocoder like WaveNet to transform it into an audio waveform that sounds natural, producing synthesized speech that matches the input text.

WaveNet produces audio samples directly because it functions at the waveform level. It makes use of an autoregressive architecture, making successive predictions about each audio sample based on prior samples and the input mel-spectrogram. WaveNet can extract fine-grained features and relationships from the voice signal using this autoregressive method, producing high-quality synthesized speech.[10]

CONCLUSION

In summary, the study on "VisionVoice - An image captioning web application that converts it to audio for the visually impaired" marks a significant advancement in the pursuit of accessibility and inclusivity. This study successfully established the viability of producing descriptive captions for photographs, answering a crucial need for the community of people who are visually impaired. It did this by utilizing the AlexNet-LSTM model with the FLICKR 8K dataset. The quality of natural sounding speech was further enhanced by the incorporation of cutting- edge tools like Tacotron 2 and WaveNet as a vocoder, guaranteeing that the information provided in image captions is not only correct but also presented in a natural and understandable way.

This study highlights the enormous potential for improvements in accessibility technologies and image captioning as we look to the future. There is a definite route towards obtaining even greater levels of caption generation accuracy with the continuous development of hardware capabilities and deep learning models, thereby boosting the user experience for people who are visually impaired.

FUTURE SCOPE

Future study on "VisionVoice - An image captioning web application that converts it to audio for the visually impaired" has a huge potential for accessibility and technological breakthroughs. Despite the obstacles in the way of exact caption production at the moment, this research opens the door to intriguing possibilities in the years to come.

First off, as technology develops, especially in terms of hardware capabilities and deep learning models, it is anticipated that the accuracy of creating image captions would considerably increase.

Additionally, there is tremendous promise in the idea of expanding this model to develop a full Image-Speech conversion system that speaks image captions. With real-time access to information and a better awareness of their surroundings, such a device may be a priceless aid for those with visual impairments. Modern Text-to-Speech (TTS) technologies will be combined with image captioning models to provide a seamless and accessible multimedia experience that will advance the value of life for the visually challenged community.

In conclusion, despite certain difficulties now, the "VisionVoice" project's future seems bright. There is a good chance that accurate picture caption generation will become more and more feasible with continued improvements in hardware and deep learning models. The ultimate objective of developing this technology to enable Image-Speech conversion has the power to revolutionize inclusion and accessibility, having a significant and profound effect on the lives of those who are visually impaired.

## VisionVoice manuscript - page 9

ACKNOWLEDGMENTS

We would like to express our sincere gratitude to Dr. Neha Tyagi for all of her help and assistance during the research process for "VisionVoice - An image captioning web application that converts it to audio for the visually impaired." This study initiative has taken on significance as a result of Dr. Tyagi's extensive expertise, wise counsel, and dedication.

In addition to deepening our knowledge of the subject, Dr. Tyagi's mentoring has given us a sense of mission and commitment to furthering inclusion and accessibility in technology. She has been our leader as we navigated the complexities of picture captioning, TTS models, and accessibility solutions thanks to her patient encouragement, wise counsel, and helpful criticism. We sincerely thank Dr. Neha Tyagi for her constant support and are extremely appreciative of the chance to work with her as a mentor. Her commitment to ensuring our academic advancement and the accomplishment of this research project has been crucial, and we anticipate using the knowledge and abilities we have acquired under her direction in future endeavors.

REFERENCES

1. Liu, Shuang & Bai, Liang & Hu, Yanli & Wang, Haoran, “Image Captioning Based on Deep Neural Networks”, MATEC Web Conf. Volume 232, 2018. 2. Aishwarya Maroju , Sneha Sri Doma , Lahari Chandarlapati, “Image Caption Generating Deep Learning Model”, INTERNATIONAL JOURNAL OF ENGINEERING RESEARCH & TECHNOLOGY (IJERT) Volume 10, Issue 09, 2021. 3. H. Agrawal et al., "nocaps: novel object captioning at scale," 2019 IEEE/CVF International Conference on Computer Vision (ICCV), Seoul, Korea (South), 2019, pp. 8947-8956, doi: 10.1109/ICCV.2019.00904. 4. Yin, W., Kann, K., Yu, M., & Schütze, H. (2017, February 7). Comparative study of CNN and RNN for natural language processing. arXiv.org. https://arxiv.org/abs/1702.01923 5. Jiao, Y., Gabrys, A., Tinchev, G., Putrycz, B., Korzekwa, D., & Klimkov, V. (2021, February 15). Universal neural vocoding with parallel WaveNet. arXiv.org. https://arxiv.org/abs/2102.01106 6. Donahue, Jeffrey, et al. ”Long-term recurrent convolutional networks for visual recogni-tion and description.” Proceedings of the IEEE conference on computer vision and pattern recognition, 2015. 7. S. Takkar, A. Jain and P. Adlakha, "Comparative Study of Different Image Captioning Models," 2021 5th International Conference on Computing Methodologies and Communication (ICCMC), Erode, India, 2021, pp. 1366-1371, doi: 10.1109/ICCMC51019.2021.9418451. 8. Anitha Kumari, K., Mouneeshwari, C., Udhaya, R.B., Jasmitha, R. (2020). Automated Image Captioning for Flickr8K Dataset. In: Kumar, L., Jayashree, L., Manimegalai, R. (eds) Proceedings of International Conference on Artificial Intelligence, Smart Grid and Smart City Applications. AISGSC 2019 2019. Springer, Cham. https://doi.org/10.1007/978-3-030-24051-6_62 9. P. Taylor, “Text-to-Speech Synthesis”, Cambridge University Press, New York, NY, USA, 1st edition, 2009. 10. A. J. Hunt and A. W. Black, “Unit selection in a concatenative speech synthesis system using a large speech

database,” in Proc. ICASSP, 1996, pp. 373–376. 11. S. O. Arik, M. Chrzanowski, A. Coates, G. Diamos, A. Gib- ¨ iansky, Y. Kang, X. Li, J. Miller, J. Raiman, S.

Sengupta, and M. Shoeybi, “Deep voice: Real-time neural text-to-speech,” CoRR, vol. abs/1702.07825, 2017.
