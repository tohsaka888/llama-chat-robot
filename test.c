#include <stdio.h>
#include <stdlib.h>

// Function to perform a binary search on an array of integers
int binarySearch(int arr[], int low, int high, int target) {
    // Base case: if the target is not found in the array, return -1
    if (low > high) {
        return -1;
    }

    // Find the middle index of the array
    int mid = (low + high) / 2;

    // Compare the middle element to the target
    if (arr[mid] == target) {
        return mid; // Found the target in the middle
    } else if (arr[mid] < target) {
        // Target is less than the middle element, so search the
        // left subarray
        if (binarySearch(arr, low, mid - 1, target)) {
            return mid + 1; // Found the target in the left subarray
        } else {
            // Target is not found in the left subarray, so search the right
            // subarray
            if (binarySearch(arr, mid + 1, high, target)) {
                return mid; // Found the target in the right subarray
            } else {
                // Target is not found in either subarray, so return -1
                return -1;
            }
        }
    }

    return -1; // Target was not found in the array

}

// Example usage of the binarySearch function
int main() {
    int arr[5] = { 3, 6, 8, 2, 4 };
    int target = 6; // The element we are searching for
    printf("The value %d is found at index: %d\n", target, binarySearch(arr, 0, sizeof(arr) - 1, target));
    return 0;
}