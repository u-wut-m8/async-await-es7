const users = [{
  id: 1,
  name: "Potato",
  sId: 101
}, {
  id: 2,
  name: "Banana",
  sId: 99
}];

const grades = [{
  id: 1,
  sId: 101,
  grade: 86
}, {
  id: 2,
  sId: 99,
  grade: 100
}, {
  id: 3,
  sId: 101,
  grade: 80
}];

const getUser = id => {
  return new Promise((resolve, reject) => {
    const user = users.find(user => user.id === id);
    if (user)
      resolve(user);
    else
      reject(`Unable to find user with id of ${id}.`);
  });
};

const getGrades = sId => {
  return new Promise((resolve, reject) => {
    resolve(grades.filter(grade => grade.sId === sId));
  });
};

const getStatus = id => {
  let user;
  return getUser(id).then(tempUser => {
    user = tempUser;
    return getGrades(user.sId);
  }).then(grades => {
    let average = 0;
    if (grades.length > 0)
      average = grades.map(grade => grade.grade).reduce((a, b) => a+b)/grades.length;
    return `${user.name} has a ${average}% in the class.`;
  });
};

const getStatusAlt = async userId => {
  const user = await getUser(userId);
  const grades = await getGrades(user.sId);
  let average = 0;
  if (grades.length > 0)
    average = grades.map(grade => grade.grade).reduce((a, b) => a+b)/grades.length;
  return `${user.name} has a ${average}% in the class.`;
  // throw new Error("Error occurred!");
  // return "Potato";
};

getStatusAlt(1).then(name => {
  console.log(name);
}).catch(err => {
  console.log(err);
});

// getStatus(1).then(status => {
//   console.log(status);
// }).catch(err => {
//   console.log(err);
// });
