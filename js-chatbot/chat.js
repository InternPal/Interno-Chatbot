const { dockStart } = require('@nlpjs/basic');

const returnAnswer = async (question) => {
    const dock = await dockStart();
    const nlp = dock.get('nlp');
    return nlp.process('en', question);
};

module.exports = returnAnswer;




