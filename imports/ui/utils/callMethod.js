import { Meteor } from 'meteor/meteor';

const callMethod = (name, params) => new Promise((resolve) => Meteor
  .call(name, params, (err, res) => {
    if (err) {
      console.error(err);

      resolve({
        err: err.message || err.reason || '',
      });

      return;
    }

    resolve({
      res,
    });
  }));


export default callMethod;
