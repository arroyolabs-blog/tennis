async function tennis() {
	for await (const status of rally()) {
		console.log(status.message);
        if(!status.active) {
          break;
        }
    }
    console.log('Game!');
}

async function* rally() {
  while (true) {
    yield await djokovic();
    yield await federer();
  }
}

const federer = async () => {
    try {
        return await returnBall("Federer", 0.8);
    } catch(failure) {
        return failure;
    }
}

const djokovic = async () => {
    try {
        return await returnBall("Djokovic", 0.8);
    } catch(failure) {
        return failure;
    }
}

//determines the success/failure of hitting tennisball
const returnBall = (player, returnRate) => new Promise((resolve, reject) => {
    const random = Math.random();
    const time = Math.random() * (2000 - 500) + 500;
    setTimeout(() => {
        if (returnRate > random) {
            return resolve({active: true, message: `${player} hits the ball`});
        } else {
            return reject({active: false, message: `${player} fails to return the ball`});
        }
    }, time);
});

tennis();
