//  nums = [2,7,11,15]  target = 9  ans = [0,1]
//  nums = [3,2,4]  target = 6  ans = [1,2]
//  nums = [3,3]  target = 6  ans = [0,1]
function returnTarget(arr, target) {
    const map = arr.map((item, index) => {
        const currentIndex = index;
        let prevIndex = currentIndex - 1;
        if(arr[currentIndex] + arr[prevIndex] === target) {
            console.log(`[${prevIndex}, ${currentIndex}]`);
        }
    })
};

returnTarget([2,7,11,15], 9)
returnTarget([3,2,4], 6)
returnTarget([3,3], 6)