# VisionInspect - AI / Anomaly Detection Pipeline

This directory is designated for the Convolutional Autoencoder (CAE) model implementation and training pipelines.

### Planned Components:
- `models/`: TensorFlow/Keras Convolutional Autoencoder model architecture and saved weights (`.h5` / `.keras`)
- `preprocessing/`: OpenCV pipelines (grayscale conversion, resizing to 256x256, normalization, morphological filtering)
- `inference/`: Forward pass, reconstruction error computation (MSE/SSIM), anomaly heatmap generation (JET colormap), and adaptive threshold severity estimation

### Dataset Reference:
- MVTec Anomaly Detection (MVTec AD) benchmark dataset
- Unsupervised training regime: Trained strictly on defect-free product specimens
