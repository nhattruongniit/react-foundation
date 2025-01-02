export function awaitTime(time = 3000, isError = false) {
  return new Promise((resolve) => {
    setTimeout(() => {
      if(isError) {
        return resolve(Promise.reject('Error'))
      };
      resolve()
    }, time)
  })
}