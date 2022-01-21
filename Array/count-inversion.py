def Merge(l,r, A):
    countInversion = 0
    ln = len(l)
    rn = len(r)
    i = 0
    j = 0
    k = 0
    while i<ln and j<rn:
        if(l[i] <= r[j]):
            A[k] = l[i]
            k += 1
            i += 1
        elif(l[i] > r[j]):
            countInversion = countInversion + ln - i
            A[k] = r[j]
            k += 1
            j += 1
    while(i < ln):
        A[k] = l[i]
        k += 1
        i += 1
    while(j < rn):
        A[k] = r[j]
        k += 1
        j += 1
    return countInversion

def mergeSort(A):
    countInversion = 0
    n = len(A)
    if n < 2:
	    return countInversion
    mid = int(n/2)
    left = []
    right = []
    for i in range(mid):
        left.append(A[i])
    for j in range(mid,n):
        right.append(A[j])
    countInversion+=mergeSort(left)
    countInversion+=mergeSort(right)
    countInversion+=Merge(left,right,A)
    return countInversion
	
def getInversions(A, n):
	return mergeSort(A)

# Taking inpit using fast I/O.
def takeInput() :
    n = int(input())
    arr = list(map(int, input().strip().split(" ")))
    return arr, n

# Main.
A, n = takeInput()
print(getInversions(A, n))