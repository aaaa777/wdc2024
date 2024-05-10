class DescriptionManager {
  constructor(descriptionSequence = []) {
    this.descriptionSequence = descriptionSequence;
  }

  readByIndex(index) {
    if(index < 0 || index >= this.descriptionSequence.length) {
      return '---';
    }
    return this.descriptionSequence[index];
  }
}

export default DescriptionManager;